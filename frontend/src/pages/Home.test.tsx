import Home from "@/pages/Home.tsx";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

const renderHomeWithRouter = () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
};

describe("Home page", () => {
  it("should display the welcome message", () => {
    renderHomeWithRouter();
    expect(screen.getByRole("heading", { name: /podracing sim/i }));
  });

  it("should have button to build a pod", () => {
    renderHomeWithRouter();
    expect(screen.getByRole("button", { name: /build your pod/i }));
  });

  it("should have a banner image", () => {
    renderHomeWithRouter();
    expect(screen.getByRole("img", { name: /anakin starting his pod/i }));
  });
});
