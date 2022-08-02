describe("course", () => {
  it("Should create a new course", () => {
    cy.login("Test", "mauricio15");
    cy.get("[test-id='create-course-btn'").click();
    cy.url().should("include", "new");
    cy.get("[test-id='new-course-input'").type("React");
    cy.get("[test-id='new-course-btn'").click();
    cy.wait(5000);
    cy.url().should("include", "difficulty");
    cy.get("[test-id='start-course-btn'").first().click();
    cy.url().should("include", "hub");
  });
});
