import { render, screen } from "@testing-library/react";
import PodBuilder from "@/components/PodBuilder.tsx";
import { MemoryRouter } from "react-router";

const renderWithMemoryRouter = () => {
  render(
    <MemoryRouter>
      <PodBuilder />
    </MemoryRouter>,
  );
};

describe("PodBuilder", () => {
  it("should prompt the user to build their pod", () => {
    renderWithMemoryRouter();
    expect(screen.getByText(/build your pod/i)).toBeVisible();
  });

  it("should have a description", () => {
    renderWithMemoryRouter();
    expect(
      screen.getByText(
        /Choose a name, number of engines, color, and the armor rating./,
      ),
    ).toBeVisible();
  });

  it("should have a selector for engine count", () => {
    renderWithMemoryRouter();
    expect(
      screen.getByRole("spinbutton", { name: /engine count/i }),
    ).toBeVisible();
  });

  it("should have an input for name", () => {
    renderWithMemoryRouter();
    expect(screen.getByRole("textbox", { name: /name/i })).toBeVisible();
  });

  it("should have an input for color", () => {
    renderWithMemoryRouter();
    expect(screen.getByRole("textbox", { name: /pod color/i })).toBeVisible();
  });

  it("should have a selector for armor rating", () => {
    renderWithMemoryRouter();
    expect(
      screen.getByRole("spinbutton", { name: /armor rating/i }),
    ).toBeVisible();
  });
});
