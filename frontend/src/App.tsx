import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { TopNav, Home, Footer } from "./layout";
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
        <Footer />
      </Container>
    </>
  );
}

export default App;
