import { render } from "@testing-library/react";
import HomePage from "../pages/HomePage";

describe("HomePage", () => {
  let context;

  beforeEach(() => {
    context = render(<HomePage />);
  });

  it("displays the title", () => {
    const title = "Reversed Spider Solitaire";

    const { queryByText } = context;

    expect(queryByText(title)).not.toBeNull();
  });
});
