import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

const defaultChecked = ["traceNumber", "amplitudeMeanPa", "npOpenForAllLevels"];

export function ConfigurableTable({
  rows,
}: {
  rows: Array<Record<string, any>>;
}) {
  const [fieldsState, setFieldsState] = useState({} as Record<string, any>);

  function setStateOfField(key: string, checked: boolean) {
    console.log("setStateOfField", key, true);
    setFieldsState({
      ...fieldsState,
      [key]: checked,
    });
    console.log(fieldsState);
  }
  useEffect(() => {
    const keys = removeDuplicates(rows.map((row) => Object.keys(row)).flat());
    const newFieldsState = Object.assign(
      {},
      ...keys.map((key) => ({ [key]: false })),
      ...defaultChecked.map((key) => ({ [key]: true }))
    );
    setFieldsState(newFieldsState);
  }, [rows]);

  function getSelectedKeys(): string[] {
    return Object.keys(fieldsState).filter((key) => fieldsState[key]);
  }

  return (
    <>
      <Form>
        {Object.keys(fieldsState).map((key, i) => (
          <Form.Check
            inline
            key={key}
            type="checkbox"
            id={"selection-" + key}
            label={key}
            checked={fieldsState[key]}
            onChange={() => setStateOfField(key, !fieldsState[key])}
          ></Form.Check>
        ))}
      </Form>
      <Table
        striped
        bordered
        hover
        className="mt-3"
        style={{ overflowX: "auto", display: "block" }}
      >
        <thead>
          <tr>
            {getSelectedKeys().map((key, j) => (
              <th key={j}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {getSelectedKeys().map((key, j) => (
                <td key={j}>{row[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

function removeDuplicates<T>(arr: T[]): T[] {
  let s = new Set(arr);
  let it = s.values();
  return Array.from(it);
}
