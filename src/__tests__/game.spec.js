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
    const buttonText = "Restart";

    const { queryByText } = context;

    expect(queryByText(buttonText)).not.toBeNull();
  });
});
