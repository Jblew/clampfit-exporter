import { PatchSample } from "appdomain";
import Table from "react-bootstrap/Table";

export function SamplesTable({ samples }: { samples: PatchSample[] }) {
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
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
