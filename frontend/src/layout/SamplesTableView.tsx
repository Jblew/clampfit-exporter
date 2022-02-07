import { getFromApi } from "api";
import { useEffect, useState } from "react";
import { SamplesTable } from "./SamplesTable";
import Alert from "react-bootstrap/Alert";
import { PatchSample } from "appdomain";

export function SampelsTableView() {
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

    async function doLoadSamples(): Promise<any[]> {
      return getFromApi("/samples");
    }
  }

  useEffect(() => loadSamples(), []);

  return (
    <>
      {samples.length && <SamplesTable samples={samples} />}
      {loading && <Alert variant="primary">Loading table...</Alert>}
      {error && <Alert variant="danger">Error: {error}</Alert>}
    </>
  );
}
