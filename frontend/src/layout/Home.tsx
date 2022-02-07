import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PatchForm } from "./PatchForm";

export function Home() {
  return (
    <>
      <Row>
        <Col>
          <h1>Adding patch sample</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <PatchForm />
        </Col>
      </Row>
    </>
  );
}
