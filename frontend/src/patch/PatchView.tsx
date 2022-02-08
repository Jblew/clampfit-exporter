import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PatchForm } from "../patch/PatchForm";
import { useEffect, useState } from "react";
import { getFromApi } from "api";
import { PatchSample } from "appdomain";
import { SamplesTable } from "./SamplesTable";
import Alert from "react-bootstrap/Alert";

export function PatchView() {
  const [samples, setSamples] = useState([] as PatchSample[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function loadSamples() {
    setError("");
    setLoading(true);
    doLoadSamples().then(
      (samples) => {
        setLoading(false);
        setSamples(samples);
      },
      (err) => {
        setError(`${err}`);
        setLoading(false);
      }
    );

    async function doLoadSamples(): Promise<PatchSample[]> {
      const resp: { samples: PatchSample[] } = await getFromApi("/samples");
      return resp.samples;
    }
  }

  useEffect(() => loadSamples(), []);

  return (
    <>
      <Header>Adding patch sample</Header>
      <Container>
        <PatchForm setSamples={setSamples} />
      </Container>
      <Header>Previous samples</Header>
      <Container>
        {samples.length && <SamplesTable samples={samples} />}
        {loading && <Alert variant="primary">Loading table...</Alert>}
        {error && <Alert variant="danger">Error: {error}</Alert>}
        {!error && !loading && !samples.length && <NoSamples />}
      </Container>
    </>
  );
}

function Container({ children }: { children: any }) {
  return (
    <Row>
      <Col>{children}</Col>
    </Row>
  );
}

function Header({
  children,
}: {
  children: JSX.Element | JSX.Element[] | string;
}) {
  return (
    <Row className="mt-5">
      <Col>
        <h1>{children}</h1>
      </Col>
    </Row>
  );
}

function NoSamples() {
  return <p style={{ textAlign: "center" }}>No samples yet</p>;
}
