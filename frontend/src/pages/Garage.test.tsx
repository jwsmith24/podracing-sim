import Garage from "@/pages/Garage.tsx";
import { render, screen } from "@testing-library/react";

describe("Garage view", () => {
  it("should have a page header", () => {
    render(<Garage />);
    expect(screen.getByRole("heading", { name: /garage/i })).toBeVisible();
  });
});
