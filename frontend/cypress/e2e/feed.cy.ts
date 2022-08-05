import { uuid } from "../support/commands";

describe("feed", () => {
  beforeEach(() => {
    window.localStorage.setItem(
      "learning-u-tour",
      JSON.stringify({
        dashboard: true,
        "new-course": true,
        difficulty: true,
        featured: true,
        hub: true,
        following: true,
        post: true,
      })
    );
  });
  it("Should make a new post", () => {
    const postContent = `This is a post ${uuid()}`;
    cy.login("Test", "test1234");
    cy.get("[test-id='feed-navbar'").click();
    cy.url().should("include", "feed");
    cy.get("[test-id='create-post-btn'").click();
    cy.get("[test-id='new-post-textarea'").type(postContent);
    cy.get("[test-id='new-post-submit-btn'").click();
    cy.window().contains(postContent);
    cy.window().wait(5000);
    cy.window().contains("less than a minute ago");
  });

  it("Should follow a user", () => {
    cy.login("Test", "test1234");
    cy.get("[test-id='feed-navbar'").click();
    cy.url().should("include", "feed");
    cy.get("[test-id='follow-btn']").click();
    cy.get("[test-id='follow-input']").type("Test");
    cy.get("[test-id='submit-follow-btn']").click();
  });
});
