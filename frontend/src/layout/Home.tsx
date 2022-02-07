import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PatchForm } from "./PatchForm";
import { SampelsTableView } from "./SamplesTableView";

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
      <Row>
        <Col>
          <h1>Previous samples</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <SampelsTableView />
        </Col>
      </Row>
    </>
  );
}
