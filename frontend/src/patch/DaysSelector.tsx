import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

export function DaysSelector({
  days,
  onDaysChanged,
}: {
  days: number;
  onDaysChanged: (v: number) => void;
}) {
  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.1)",
        float: "right",
        padding: "0.25rem",
        fontSize: "0.75rem",
        marginBottom: "0.25rem",
      }}
    >
      Show last &nbsp;
      <input
        type="number"
        value={days}
        onChange={(e) => onDaysChanged(parseInt(e.target.value))}
      />
      &nbsp; days
    </div>
  );
}
