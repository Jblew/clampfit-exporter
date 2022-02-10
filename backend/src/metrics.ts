import { Counter, Gauge, register } from "prom-client";
import { getRepository } from "typeorm";
import { PatchSample } from "./entity/PatchSample";
import express from "express";

const prometheusSecret = "J2n2mZLtj3vHXifHiP8IIIYZCn0IO";
const basename = "clampfit_exporter";

const requestsCounter = new Counter({
  name: `${basename}_samples_count`,
  help: "Count of requests",
  labelNames: ["method", "statusCode"] as const,
});

const samplesCountGauge = new Gauge({
  name: `${basename}_samples_count`,
  help: "Count of emails present in samples database",
  async collect() {
    const samplesCount = await getRepository(PatchSample).count();
    this.set(samplesCount);
  },
});

// Disabled until I work out how to do select with in typeorm
/*
const emailsCountGauge = new Gauge({
  name: `${basename}_samples_count`,
  help: "Count of emails present in samples database",
  async collect() {
    const emailCount = await getRepository(PatchSample)
      .createQueryBuilder("samples")
    Correct query is:
    WITH agg AS (
      SELECT DISTINCT email, COUNT(*) FROM samples GROUP BY email
    ) SELECT COUNT(*) FROM agg
    this.set(emailCount);
  },
});*/

export function getMetricsMiddleware() {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    next();
    requestsCounter
      .labels({ method: req.method, statusCode: res.statusCode })
      .inc(1);
  };
}

export function getMetricsRoutes() {
  const router = express.Router();
  router.get("/metrics", async (req, res) => {
    if (req.query.prometheus !== prometheusSecret) {
      return res.status(403).send("Missing or wrong secret");
    }
    try {
      res.set("Content-Type", register.contentType);
      res.end(await register.metrics());
    } catch (ex) {
      console.error(ex);
      res.status(500).send(ex);
    }
  });
  return router;
}
