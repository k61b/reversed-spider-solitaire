describe("GamePage", () => {
  beforeEach(() => {
    cy.server({ force: true });
    cy.visit("/");
    cy.contains("Start").click();
  });

  describe("NavBar", () => {
    it("Display NavBar", () => {
      const navText = "Highest Score Ever";
      const navButton = "Restart";

      cy.contains(navText);
      cy.contains(navButton);
    });
  });
});
