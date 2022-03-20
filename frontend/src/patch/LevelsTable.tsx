import { LevelsTableRow } from "appdomain";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

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
  const levels = range(levelsFrom, levelsTo);

  return (
    <>
      <Table
        striped
        bordered
        hover
        className="mt-3"
        style={{ overflowX: "auto", display: "block" }}
      >
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
    </>
  );
}

const range = (start: number, end: number) =>
  Array.from({ length: end - start }, (v, k) => k + start);
