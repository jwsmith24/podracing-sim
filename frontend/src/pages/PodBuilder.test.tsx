import { render, screen } from "@testing-library/react";
import PodBuilder from "@/pages/PodBuilder.tsx";

describe("PodBuilder", () => {
  it("should prompt the user to build their pod", () => {
    render(<PodBuilder />);
    expect(screen.getByText(/build your pod/i)).toBeVisible();
  });

  it("should have a description", () => {
    render(<PodBuilder />);
    expect(
      screen.getByText(
        /Choose a name, number of engines, color, and the armor rating./,
      ),
    ).toBeVisible();
  });

  it("should have a selector for engine count", () => {
    render(<PodBuilder />);
    expect(
      screen.getByRole("spinbutton", { name: /engine count/i }),
    ).toBeVisible();
  });

  it("should have an input for name", () => {
    render(<PodBuilder />);
    expect(screen.getByRole("textbox", { name: /name/i })).toBeVisible();
  });

  it("should have an input for color", () => {
    render(<PodBuilder />);
    expect(screen.getByRole("textbox", { name: /pod color/i })).toBeVisible();
  });

  it("should have a selector for armor rating", () => {
    render(<PodBuilder />);
    expect(
      screen.getByRole("spinbutton", { name: /armor rating/i }),
    ).toBeVisible();
  });
});
