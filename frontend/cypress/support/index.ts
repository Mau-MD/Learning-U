/// <reference types="cypress" />

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    login(username: string, password: string): Chainable<Element>;
    register(
      username: string,
      password: string,
      email: string
    ): Chainable<Element>;
  }
}
