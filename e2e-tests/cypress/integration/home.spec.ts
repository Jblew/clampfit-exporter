/// <reference types="cypress" />

describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays header", () => {
    cy.findByText("Clampfit-exporter", { exact: false }).should("exist");
  });

  it("displays info on Joanna", () => {
    cy.findByText("Joanna Jasińska", { exact: false }).should("exist");
  });

  it("displays info on Jędrzej", () => {
    cy.findByText("Jędrzej Lewandowski", { exact: false }).should("exist");
  });
});
