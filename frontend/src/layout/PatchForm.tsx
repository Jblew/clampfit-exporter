import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import { getFromApi } from "api";

export function PatchForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function send() {
    return getFromApi("/add_sample");
  }

  function handleSubmit(event: any) {
    console.log(event);
    setLoading(true);
    setError("");
    send().then(
      () => setLoading(false),
      (err) => setError(err)
    );
  }
  return (
    <>
      {!loading && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formSampleName">
            <Form.Label>Sample name (optional)</Form.Label>
            <Form.Control type="text" placeholder="Enter sample name" />
            <Form.Text className="text-muted">
              This is just optional ;)
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.clampfitPaste">
            <Form.Label>Paste clipboard from clampfit here</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add 🚀
          </Button>
        </Form>
      )}

      {loading && <Alert variant="primary">Loading...</Alert>}
      {error && <Alert variant="danger">Error: {error}</Alert>}
    </>
  );
}
/*
 <Form.Group className="mb-3">
        <Form.Label>Data</Form.Label>
        <Form.Control placeholder={new Date().toISOString().substring(0, 10)} />
      </Form.Group>
      */
