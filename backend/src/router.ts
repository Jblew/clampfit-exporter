import express from "express";
import { envMust } from "./utils";
import { authOr403 } from "@/auth";

const frontendRedirectURL = envMust("FRONTEND_REDIRECT_URL");
export function getRoutes() {
  const router = express.Router();
  router.get("/", (_req, res) => {
    res.redirect(frontendRedirectURL);
  });

  router.get("/health", (req, res) => {
    res.send({ ok: true });
  });

  router.get("/profile", authOr403(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });

  return router;
}
