import Home from "@/pages/Home.tsx";
import { render } from "@testing-library/react";

describe("Home page", () => {
  it("should display the welcome message", () => {
    render(<Home />);
  });
});
