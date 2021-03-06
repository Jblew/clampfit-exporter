import { LevelsTableRow } from "appdomain";
import Table from "react-bootstrap/Table";
import "./LevelsTable.css";

export function LevelsTable({
  rows,
  selectedFields,
}: {
  rows: LevelsTableRow[];
  selectedFields: string[];
}) {
  const levelsFrom = rows
    .map((row) => Math.min(...row.levels))
    .reduce((a, b) => Math.min(a, b), 1);
  const levelsTo = rows
    .map((row) => Math.max(...row.levels))
    .reduce((a, b) => Math.max(a, b), 1);
  const levels = range(levelsFrom, levelsTo + 1);

  return (
    <div className="levels-table-overlay">
      <Table striped bordered hover className="levels-table mt-3 table-sm">
        <thead>
          <tr>
            {selectedFields.map((field, i) => (
              <th key={i} colSpan={levels.length}>
                {field}
              </th>
            ))}
          </tr>
          <tr>
            {selectedFields.map((field, i) =>
              levels.map((level, j) => <th key={`${i}_${j}`}>{level}</th>)
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowI) => (
            <tr key={rowI}>
              {selectedFields.map((field, i) =>
                levels.map((level, j) => (
                  <td key={`${i}_${j}`}>{row[field]?.[level] || ""}</td>
                ))
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

const range = (start: number, end: number) =>
  Array.from({ length: end - start }, (v, k) => k + start);
