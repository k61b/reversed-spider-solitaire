describe("HomePage", () => {
  beforeEach(() => {
    cy.server({ force: true });
    cy.visit("/");
  });

  it("shows HomePage title", () => {
    const title = "Reversed Spider Solitaire";

    cy.contains(title);
  });

  it("click start button", () => {
    cy.contains("Start").click();

    cy.url("/game");
  });
});
