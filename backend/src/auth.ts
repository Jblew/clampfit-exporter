import { auth } from "express-openid-connect";
import { RequestHandler } from "express";
import { envMust } from "./utils";

export function getAuthMiddleware() {
  return auth({
    authRequired: false,
    auth0Logout: true,
    secret: envMust("OIDC_AUTH_SECRET"),
    baseURL: envMust("BASE_URL"),
    clientID: envMust("OIDC_CLIENT_ID"),
    issuerBaseURL: envMust("OIDC_ISSUER_BASEURL"),
    routes: {
      callback: "auth_callback",
    },
  });
}

export function authOr403(): RequestHandler {
  return function (req, res, next) {
    if (!req.oidc.isAuthenticated()) {
      res.status(403).send({
        error: `Authentication required. Redirect user to login endpoint`,
      });
    }
    next();
  };
}
