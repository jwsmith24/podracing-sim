import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar.tsx";
import { MemoryRouter } from "react-router";

describe("Navbar", () => {
  const renderWithRouter = (ui: React.ReactNode) =>
    render(<MemoryRouter>{ui}</MemoryRouter>);

  it("should have a link to home", () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByRole("link", { name: /home/i })).toBeVisible();
  });
});
