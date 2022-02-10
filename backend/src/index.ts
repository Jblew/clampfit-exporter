import express from "express";
import { getRoutes } from "./router";
import { getAuthMiddleware } from "@/auth";
import morgan from "morgan";
import { initDatabase } from "./db";
import { getMetricsMiddleware, getMetricsRoutes } from "./metrics";

async function run() {
  const app = express();
  const port = process.env.PORT || 3000;
  const routeBase = process.env.ROUTE_BASE || "/";

  await initDatabase();

  app.use(express.json());
  app.use(getMetricsMiddleware());

  morgan.token("email", function (req: any, res) {
    return req.oidc?.user?.email || "no@auth";
  });
  app.use(
    morgan(
      ":date[iso] :email :method :url :status :res[content-length] - :response-time ms"
    )
  );
  app.use(routeBase, getAuthMiddleware());
  app.use(routeBase, getRoutes());
  app.use(routeBase, getMetricsRoutes());

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

run().catch((err) => {
  console.error("Error in main loop, exitting", err);
  process.exit(1);
});
