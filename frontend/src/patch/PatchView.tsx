import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PatchForm } from "../patch/PatchForm";
import { useEffect, useState } from "react";
import { LevelsTableRow, PatchSample } from "appdomain";
import { SamplesTable } from "./SamplesTable";
import Alert from "react-bootstrap/Alert";
import { deleteSample, fetchData } from "./api";
import { ConfigurableTable } from "./ConfigurableTable";
import { LevelsTable } from "./LevelsTable";

const defaultChecked = [
  "traceNumber",
  "amplitudeMeanPa",
  "npOpenForAllLevels",
  "pOpenForSpecifiedLevel",
];

export function PatchView() {
  const [selectedFields, setSelectedFields] = useState(
    defaultChecked as string[]
  );
  const [samples, setSamples] = useState([] as PatchSample[]);
  const [levelsTables, setLevelsTables] = useState([] as LevelsTableRow[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function loadSamples() {
    setError("");
    setLoading(true);
    fetchData().then(
      (data) => {
        setLoading(false);
        setSamples(data.samples);
        setLevelsTables(data.levelsTables);
      },
      (err) => {
        setError(`${err}`);
        setLoading(false);
      }
    );
  }

  function doDeleteSample(ID: string) {
    setError("");
    setLoading(true);
    deleteSample(ID).then(
      (samples) => {
        setLoading(false);
        setSamples(samples);
      },
      (err) => {
        setError(`${err}`);
        setLoading(false);
      }
    );
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
        {!!samples.length &&
          (<SamplesTable samples={samples} deleteSample={doDeleteSample} /> ||
            "")}
        {loading && <Alert variant="primary">Loading table...</Alert>}
        {error && <Alert variant="danger">Error: {error}</Alert>}
        {!error && !loading && !samples.length && <NoSamples />}
      </Container>
      <Header>Configurable export table</Header>
      <Container>
        <ConfigurableTable
          rows={samples}
          selectedFields={selectedFields}
          onSelectedFieldsChanged={(fields) => setSelectedFields(fields)}
        />
      </Container>

      <Header>Levels table (last 30 days)</Header>
      <Container>
        <LevelsTable rows={levelsTables} />
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
    <Row className="mt-5 mb-1">
      <Col>
        <h1 style={{ textAlign: "center" }}>{children}</h1>
      </Col>
    </Row>
  );
}

function NoSamples() {
  return <p style={{ textAlign: "center" }}>No samples yet</p>;
}
