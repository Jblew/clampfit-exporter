import express from "express";
import { envMust } from "./utils";

export function getRoutes() {
  const router = express.Router();
  router.get("/", (_req, res) => {
    res.send({ ok: true });
  });

  router.get("/health", (req, res) => {
    res.send({ ok: true });
  });

  return router;
}
