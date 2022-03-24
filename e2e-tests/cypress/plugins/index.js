/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // config.env.auth0_username = process.env.AUTH0_USERNAME;
  // config.env.auth0_password = process.env.AUTH0_PASSWORD;
  // config.env.auth0_domain = process.env.AUTH0_DOMAIN;
  // config.env.auth0_audience = process.env.AUTH0_AUDIENCE;
  // config.env.auth0_scope = process.env.AUTH0_SCOPE;
  // config.env.auth0_client_id = process.env.AUTH0_CLIENTID;
  // config.env.auth0_client_secret = process.env.AUTH0_CLIENT_SECRET;

  return config;
};
