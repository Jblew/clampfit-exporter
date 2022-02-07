import { ApiHTTPError, getFromApi } from "api";
import {
  createMachine,
  DoneInvokeEvent,
  interpret,
  assign,
  State,
} from "xstate";

export interface UserProfile {
  name: string;
  nickname: string;
  picture?: string;
  email: string;
}

export function getLogoutURL() {
  return `${process.env.REACT_APP_LOGOUT_URL}?returnTo=${window.location.origin}`;
}

export function getLoginURL() {
  return `${process.env.REACT_APP_LOGIN_URL}`;
}

export type AuthStateName = "loading" | "error" | "loggedIn" | "loggedOut";
export interface AuthState {
  state: AuthStateName;
  profile?: UserProfile;
}

export function getAuthState(): AuthState {
  const interpreter = getOrStartAuthMachineInterpreter();
  return machineStateToAuthState(interpreter.state as any);
}

export function onAuthStateChanged(
  subscriberFn: (authState: AuthState) => void
): { unsubscribe(): void } {
  const interpreter = getOrStartAuthMachineInterpreter();
  return interpreter.subscribe((state) => {
    if (state.changed) {
      subscriberFn(machineStateToAuthState(state as any));
    }
  });
}

const authMachine = createMachine(
  {
    id: "auth",
    initial: "loading",
    context: {
      profile: undefined as UserProfile | undefined,
    },
    states: {
      loading: {
        invoke: {
          src: "getProfile",
          onDone: {
            target: "loggedIn",
            actions: [
              "logSuccess",
              assign({
                profile: (_ctx, evt: DoneInvokeEvent<UserProfile>) => evt.data,
              }),
            ],
          },
          onError: [
            {
              target: "loggedOut",
              cond: (_ctx, evt: DoneInvokeEvent<ApiHTTPError>) =>
                evt.data.code === 403,
            },
            { target: "error", actions: "logError" },
          ],
        },
      },
      error: {
        after: { [1 * 60 * 1000]: { target: "loading" } },
      },
      loggedOut: {
        entry: "resetProfile",
        after: { [15 * 60 * 1000]: { target: "loading" } },
      },
      loggedIn: {
        after: { [15 * 60 * 1000]: { target: "loading" } },
      },
    },
  },
  {
    services: {
      getProfile: () => getFromApi<UserProfile>("/profile"),
    },
    actions: {
      logError: (_ctx, evt) => console.error(evt.data),
      logSuccess: (_ctx, _evt) => console.log("Logged in"),
      resetProfile: assign<any>({ profile: undefined }),
    },
  }
);

function interpretAuthMachine() {
  return interpret(authMachine);
}

function getOrStartAuthMachineInterpreter(): ReturnType<
  typeof interpretAuthMachine
> {
  if (!(window as any).authMachineInterpreter) {
    (window as any).authMachineInterpreter = interpretAuthMachine().start();
  }
  return (window as any).authMachineInterpreter;
}

function machineStateToAuthState(state: State<any>): AuthState {
  return {
    state: state.value as any,
    profile: (state.context as any).profile,
  };
}
