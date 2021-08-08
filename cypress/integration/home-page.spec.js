describe("HomePage", () => {
  beforeEach(() => {
    cy.server({ force: true });
  });

  it("shows HomePage title", () => {
    const title = "Reversed Spider Solitaire";

    cy.visit("/");
    cy.contains(title);
  });

  it("click start button", () => {
    const testText = "Hello, world.";

    cy.visit("/");

    cy.contains("Start").click();

    cy.contains(testText);
  });
});
