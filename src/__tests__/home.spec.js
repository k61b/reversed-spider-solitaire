import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import HomePage from "../pages/HomePage";

describe("HomePage", () => {
  const history = createMemoryHistory();
  let context;

  beforeEach(() => {
    context = render(
      <Router history={history}>
        <HomePage />
      </Router>
    );
  });

  it("displays the title", () => {
    const title = "Reversed Spider Solitaire";

    const { queryByText } = context;

    expect(queryByText(title)).not.toBeNull();
  });
});
