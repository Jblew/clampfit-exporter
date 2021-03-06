import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavAuth } from "./NavAuth";

export function TopNav() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-5">
      <Container>
        <Navbar.Brand href="#home">Clampfit-exporter</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
          <Nav>
            <NavAuth />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
