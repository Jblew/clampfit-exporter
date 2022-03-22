export function Footer() {
  return (
    <>
      <hr className="mt-5" />
      <footer style={{ fontSize: "0.75em", color: "#aaa" }}>
        <p style={{ textAlign: "center" }}>
          Made with ❤️ &nbsp;to Joanna Jasińska
        </p>
        <p style={{ textAlign: "center" }}>
          Put together by{" "}
          <a href="https://jblewandowski.com">
            Jędrzej Bogumił Lewandowski, MD
          </a>{" "}
          overnight on Feb 2022. Copyright 2022 — {new Date().getFullYear()} by
          Jędrzej Bogumił Lewandowski. Licensed on GNU GPL v3.
        </p>
      </footer>
    </>
  );
}
