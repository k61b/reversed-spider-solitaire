describe("HomePage", () => {
  it("shows HomePage title", () => {
    const title = "Reversed Spider Solitaire";

    cy.server({ force: true });

    cy.visit("/");
    cy.contains(title);
  });
});
