import { LevelsTableRow } from "appdomain";
import Table from "react-bootstrap/Table";

// const data = {
//   levelsTables: [
//     {
//       currentMean_1: "11.87292",
//       pOpenForSpecifiedLevel_1: "0.0706262",
//       npOpenForAllLevels: "0.291962",
//       currentMean_2: "8.87292",
//       pOpenForSpecifiedLevel_2: "0.0706262",
//       currentMean_3: "2.87292",
//       pOpenForSpecifiedLevel_3: "0.1706262",
//       levels: [1, 2, 3],
//       minDate: "2022-02-15T20:12:45.199Z",
//       maxDate: "2022-02-15T20:13:20.571Z",
//     },
//     {
//       currentMean_2: "8.87292",
//       pOpenForSpecifiedLevel_2: "0.0706262",
//       npOpenForAllLevels: "0.291961",
//       levels: [2],
//       minDate: "2022-02-08T12:01:20.189Z",
//       maxDate: "2022-02-08T13:10:18.601Z",
//     },
//   ],
// };

const levels = [0, 1, 2, 3];
const columns = [
  { key: "minDate", label: "From" },
  { key: "maxDate", label: "to" },
  { key: "npOpenForAllLevels", label: "NP(open) for all levels" },
  ...levels.map((lvl) => ({
    key: `currentMean_${lvl}`,
    label: `Mean current ${lvl} lvl [pA]`,
  })),
  ...levels.map((lvl) => ({
    key: `pOpenForSpecifiedLevel_${lvl}`,
    label: `P(open) for ${lvl} lvl`,
  })),
];

export function LevelsTable({ rows }: { rows: LevelsTableRow[] }) {
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
            {columns.map((column, i) => (
              <th key={i}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowI) => (
            <tr key={rowI}>
              {columns.map((column, fieldI) => (
                <td key={fieldI}>{row[column.key] || ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
