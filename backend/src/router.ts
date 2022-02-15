import express from "express";
import { envMust } from "./utils";
import { authOr403 } from "@/auth";
import {
  deleteSample,
  getLevelsTables,
  getSamples,
  saveClampfitSummaryAsPatchSample,
} from "./application";

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

  router.post(
    "/add_sample",
    authOr403(),
    handlerWithBodyAndEmail(async ({ body, email }) => {
      const name = body.name || "";
      const clampfitPaste = body.clampfitPaste;
      if (!clampfitPaste) {
        throw new TypeError("Missing clampfitPaste");
      }
      await saveClampfitSummaryAsPatchSample({
        email,
        name,
        clampfitSummary: clampfitPaste,
      });
      const samples = await getSamples({ email });
      return { samples };
    })
  );

  router.post(
    "/delete_sample",
    authOr403(),
    handlerWithBodyAndEmail(async ({ body, email }) => {
      const ID = body.ID;
      if (!ID) {
        throw new TypeError("Missing ID");
      }
      await deleteSample({ email, ID });
      const samples = await getSamples({ email });
      return { samples };
    })
  );

  router.get(
    "/samples",
    authOr403(),
    handlerWithBodyAndEmail(async ({ email }) => {
      const samples = await getSamples({ email });
      return { samples };
    })
  );

  router.get(
    "/levels_tables",
    authOr403(),
    handlerWithBodyAndEmail(async ({ email }) => {
      const channelTables = await getLevelsTables({ email });
      return { channelTables };
    })
  );

  return router;
}

function handlerWithBodyAndEmail(
  handler: (p: { body: Record<string, any>; email: string }) => Promise<object>
) {
  return async (req: express.Request, res: express.Response) => {
    try {
      const email = req.oidc.user!.email;
      if (!email) {
        return res.status(500).send("Missing email in oidc claims");
      }
      const resp = await handler({ body: req.body, email });
      res.send(JSON.stringify(resp));
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  };
}
