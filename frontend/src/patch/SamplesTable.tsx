import { PatchSample } from "appdomain";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

export function SamplesTable({
  samples,
  deleteSample,
}: {
  samples: PatchSample[];
  deleteSample(ID: string): void;
}) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Amplitude mean [pA]</th>
          <th>P(open) for specified level</th>
        </tr>
      </thead>
      <tbody>
        {samples.map((sample, i) => (
          <tr key={i}>
            <td>{sample.date}</td>
            <td>{sample.name}</td>
            <td>{sample.amplitudeMeanPa}</td>
            <td>{sample.pOpenForSpecifiedLevel}</td>
            <td>
              <Button
                onClick={() => deleteSample(sample.ID)}
                size="sm"
                variant="link"
              >
                🗑
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
