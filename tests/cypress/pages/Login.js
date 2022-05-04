const INPUT_USERNAME = "#email"; //"#inputUserName";
const INPUT_PASSWORD = "#password"; //"#inputPassword";
const LOGIN_BUTOON = ".govuk-button";
const START_BUTTON = ".govuk-button";
const CLEARDATA = ".govuk-footer__inline-list-item > .govuk-footer__link";
const config = Cypress.config();

//Log into Application
Cypress.Commands.add("login", () => {
  cy.log();
  cy.fixture("loginData").then((data) => {
    cy.visit();
    cy.get(START_BUTTON).click();

    cy.fill("form", data);
  });
  cy.get(LOGIN_BUTOON).click();
});

Cypress.Commands.add(
  "loginWithUser",
  (username = "testbeis@acubed.it", password = "Raphael01") => {
    const config = Cypress.config();

    cy.visit("");
    cy.get(START_BUTTON).click();
    cy.WaitForBrowser();
    cy.get(INPUT_USERNAME).type(username);
    cy.get(INPUT_PASSWORD).type(password);
    cy.get(LOGIN_BUTOON).click();
    cy.WaitForBrowser();
  }
);

Cypress.Commands.add("loginWithDefaultUser", () => {
  cy.visit("");
  cy.get(CLEARDATA).click();
  cy.get(START_BUTTON).click();
  cy.WaitForBrowser();
  cy.get(":nth-child(7) > .govuk-link").click();
  cy.get(INPUT_USERNAME).type(config.username);
  cy.get(INPUT_PASSWORD).type(config.password);
  cy.get(LOGIN_BUTOON).click();
  cy.WaitForBrowser();
});

Cypress.Commands.add("clearData", () => {
  cy.get(CLEARDATA).click();
});
