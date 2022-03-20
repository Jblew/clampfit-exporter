import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

export function ConfigurableTable({
  rows,
  selectedFields,
  onSelectedFieldsChanged,
}: {
  rows: Array<Record<string, any>>;
  selectedFields: string[];
  onSelectedFieldsChanged: (fields: string[]) => void;
}) {
  const [availableFields, setAvailableFields] = useState([] as string[]);

  function getStateOfField(key: string) {
    return selectedFields.indexOf(key) >= 0;
  }
  function setStateOfField(key: string, checked: boolean) {
    if (checked) {
      onSelectedFieldsChanged([...selectedFields, key]);
    } else if (selectedFields.indexOf(key) >= 0) {
      const newFields = [...selectedFields];
      newFields.splice(selectedFields.indexOf(key), 1);
      onSelectedFieldsChanged(newFields);
    }
  }
  useEffect(() => {
    const keys = removeDuplicates(rows.map((row) => Object.keys(row)).flat());
    setAvailableFields(keys);
  }, [rows]);

  return (
    <>
      <Form>
        {availableFields.map((key, i) => (
          <Form.Check
            inline
            key={key}
            type="checkbox"
            id={"selection-" + key}
            label={key}
            checked={getStateOfField(key)}
            onChange={() => setStateOfField(key, !getStateOfField(key))}
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
            {selectedFields.map((key, j) => (
              <th key={j}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {selectedFields.map((key, j) => (
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
