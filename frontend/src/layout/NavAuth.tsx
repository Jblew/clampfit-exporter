import {
  AuthState,
  AuthStateName,
  getAuthState,
  getLoginURL,
  getLogoutURL,
  onAuthStateChanged,
} from "auth";
import { useEffect, useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";

export function NavAuth() {
  const [authState, setAuthState] = useState(getAuthState());
  useEffect(() => {
    const { unsubscribe } = onAuthStateChanged((authState) =>
      setAuthState(authState)
    );
    return function cleanup() {
      unsubscribe();
    };
  }, []);

  const stateComponent = stateComponents[authState.state];
  if (stateComponent) {
    return stateComponent({ authState });
  } else {
    return stateComponents.default({ authState });
  }
}

type StateComponent = (params: { authState: AuthState }) => JSX.Element;

const stateComponents: Record<AuthStateName | "default", StateComponent> = {
  loading: function () {
    return (
      <NavDropdown title="Loading login..." id="basic-nav-dropdown">
        <NavDropdown.Item>Loading login...</NavDropdown.Item>
      </NavDropdown>
    );
  },
  error: function () {
    return (
      <NavDropdown title="Login error" id="basic-nav-dropdown">
        <NavDropdown.Item>Login error</NavDropdown.Item>
      </NavDropdown>
    );
  },
  loggedIn: function ({ authState }) {
    return (
      <NavDropdown title={authState.profile!.name} id="basic-nav-dropdown">
        <NavDropdown.Item href={getLogoutURL()}>Log out</NavDropdown.Item>
      </NavDropdown>
    );
  },
  loggedOut: function ({ authState }) {
    return <Nav.Link href={getLoginURL()}>Log in</Nav.Link>;
  },
  default: function () {
    return <Nav.Item>Unknown auth state</Nav.Item>;
  },
};
