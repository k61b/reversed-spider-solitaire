import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import GamePage from "../pages/GamePage";

describe("GamePage", () => {
  const history = createMemoryHistory();
  let context;

  beforeEach(() => {
    context = render(
      <Router history={history}>
        <GamePage />
      </Router>,
    );
  });

  it("displays the navbar", () => {
    const navText = "Highest Score Ever:";

    const { queryByText } = context;

    expect(queryByText(navText)).not.toBeNull();
  });
});
