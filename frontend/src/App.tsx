import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { TopNav, Home } from "./layout";
import Container from "react-bootstrap/Container";
import { AuthGuard } from "layout";

function App() {
  return (
    <>
      <TopNav />
      <Container className="App">
        <AuthGuard>
          <Home />
        </AuthGuard>
      </Container>
    </>
  );
}

export default App;
