import morgan from "morgan";

export function getLoggingMiddleware() {
  morgan.token("email", function (req: any, res) {
    return req.oidc?.user?.email || "no@auth";
  });
  return morgan(
    ":date[iso] :email :method :url :status :res[content-length] - :response-time ms"
  );
}
