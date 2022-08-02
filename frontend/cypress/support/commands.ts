/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

export const uuid = () => Cypress._.uniqueId(Date.now().toString());

Cypress.Commands.add("login", (username: string, password: string) => {
  cy.visit("/login");
  const loginInput = cy.get("[test-id='login-input'");
  loginInput.type(username);
  const loginPassowrd = cy.get("[test-id='login-password'");
  loginPassowrd.type(password);
  const loginButton = cy.get("[test-id='login-button'");
  loginButton.click();
  cy.url().should("include", "dashboard");
});

Cypress.Commands.add(
  "register",
  (username: string, password: string, email: string) => {
    cy.visit("/register");
    const registerInput = cy.get("[test-id='register-input'");
    registerInput.type(username);
    const registerEmail = cy.get("[test-id='register-email'");
    registerEmail.type(email);
    const registerPassword = cy.get("[test-id='register-password'");
    registerPassword.type(password);
    const registerButton = cy.get("[test-id='register-button'");
    registerButton.click();
  }
);
