import { Gauge, register } from "prom-client";
import { getRepository } from "typeorm";
import { PatchSample } from "./entity/PatchSample";
import express from "express";

const prometheusSecret = "J2n2mZLtj3vHXifHiP8IIIYZCn0IO";

export function setupMetrics() {
  new Gauge({
    name: "clampfit_exporter_samples_count",
    help: "Count of emails present in samples database",
    async collect() {
      const samplesCount = await getRepository(PatchSample).count();
      this.set(samplesCount);
    },
  });

  new Gauge({
    name: "clampfit_exporter_emails_count",
    help: "Count of emails present in samples database",
    async collect() {
      const emailCount = await getRepository(PatchSample)
        .createQueryBuilder()
        .distinctOn(["email"])
        .getCount();
      this.set(emailCount);
    },
  });
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
      res.status(500).end(ex);
    }
  });
  return router;
}
