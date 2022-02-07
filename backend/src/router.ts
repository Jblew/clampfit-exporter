import express from "express";
import { envMust } from "./utils";
import { authOr403 } from "@/auth";
import { getRepository } from "typeorm";
import { PatchSample } from "./entity/PatchSample";

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

  router.post("/add_sample", authOr403(), (req, res) => {
    console.log("body=", req.body);
    console.log("params=", req.params);
    res.send(JSON.stringify(req.body));
  });

  router.get("/samples", authOr403(), async (req, res) => {
    const email = req.oidc.user!.email;
    if (!email) {
      return res.status(500).send("Missing email in oidc claims");
    }
    const samples = await getRepository(PatchSample).find({
      where: { email: email },
      order: { date: "DESC" },
    });
    res.send(JSON.stringify({ samples }));
  });

  return router;
}
