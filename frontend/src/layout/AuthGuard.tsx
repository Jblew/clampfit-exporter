import {
  AuthStateName,
  getAuthState,
  getLoginURL,
  onAuthStateChanged,
} from "auth";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export function AuthGuard({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) {
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
    return stateComponent({ children });
  } else {
    return stateComponents.default({ children });
  }
}

type StateComponent = (params: {
  children: JSX.Element[] | JSX.Element;
}) => JSX.Element;

const stateComponents: Record<AuthStateName | "default", StateComponent> = {
  loading: function () {
    return (
      <Layout>
        <Alert variant="primary">Loading...</Alert>
      </Layout>
    );
  },
  error: function () {
    return (
      <Layout>
        <Alert variant="danger">Error: cannot verify auth</Alert>
      </Layout>
    );
  },
  loggedIn: function ({ children }) {
    return <>{children}</>;
  },
  loggedOut: function () {
    return (
      <Layout>
        <Button href={getLoginURL()}>Please log in</Button>
      </Layout>
    );
  },
  default: function () {
    return (
      <Layout>
        <Alert variant="danger">Error: unknown auth state</Alert>
      </Layout>
    );
  },
};

function Layout({ children }: { children: JSX.Element[] | JSX.Element }) {
  return (
    <Row>
      <Col style={{ textAlign: "center" }}>{children}</Col>
    </Row>
  );
}
