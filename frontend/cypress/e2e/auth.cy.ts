import cypress from "cypress";
import { uuid } from "../support/commands";

describe("auth", () => {
  it("Should login a user", () => {
    cy.login("Test", "test1234");
  });
  it("Should register a user", () => {
    const username = uuid();
    const password = uuid();
    cy.register(username, password, `${username}@fb.com`);
    cy.login(username, password);
  });
});
