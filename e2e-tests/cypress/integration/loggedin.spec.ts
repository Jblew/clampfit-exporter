/// <reference types="cypress" />

describe("Logged in route test", () => {
  beforeEach(() => {
    (cy as any).login();
    cy.visit("/");
  });

  it("displays Adding patch sample header", () => {
    cy.findByText("Adding patch sample", { exact: false }).should("exist");
  });
});
