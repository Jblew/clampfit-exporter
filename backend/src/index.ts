import express from "express";
import { getRoutes } from "./router";
import { getAuthMiddleware } from "@/auth";
import { initDatabase } from "./db";
import { getMetricsMiddleware, getMetricsRoutes } from "./metrics";
import { getLoggingMiddleware } from "./logging";

async function run() {
  const app = express();
  const port = process.env.PORT || 3000;
  const routeBase = process.env.ROUTE_BASE || "/";

  await initDatabase();

  app.use(express.json());
  app.use(getMetricsMiddleware());
  app.use(getLoggingMiddleware());
  app.use(routeBase, getAuthMiddleware());
  app.use(routeBase, getRoutes());
  app.use(routeBase, getMetricsRoutes());

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

run().catch((err) => {
  console.error("Error in main loop, exitting", err);
  process.exit(1);
});
