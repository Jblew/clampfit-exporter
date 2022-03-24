// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "@testing-library/cypress/add-commands";

Cypress.Commands.add("login", (overrides = {}) => {
  Cypress.log({
    name: "loginViaAuth0",
  });
  const tenantURL = Cypress.env("OIDC_ISSUER_BASEURL");
  const options = {
    method: "POST",
    url: `${tenantURL}/oauth/token`,
    body: {
      grant_type: "password",
      username: Cypress.env("AUTH_USERNAME"),
      password: Cypress.env("AUTH_PASSWORD"),
      audience: `${tenantURL}/api/v2/`,
      scope: "openid profile email",
      client_id: Cypress.env("OIDC_CLIENT_ID"),
      client_secret: Cypress.env("OIDC_AUTH_SECRET"),
    },
  };
  cy.request(options).then((resp) => {
    const { id_token } = resp.body;
    const reqConf = {
      method: "POST",
      url: "/api/auth_callback",
      body: { id_token }, // Must pass only the access_token. Passing full response from oauth causes the 'missing at_hash error'
    };
    cy.request(reqConf);
  });
});
