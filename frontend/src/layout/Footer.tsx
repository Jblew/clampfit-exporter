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
          overnight on Feb 2022. All rights reversed on GNU GPL v3.
        </p>
      </footer>
    </>
  );
}
