import Track from "@/components/Track.tsx";
import { render, screen } from "@testing-library/react";

describe("Track component", () => {
  it("renders canvas and controls section", () => {
    render(<Track />);
    expect(screen.getByRole("presentation")).toBeVisible();
    expect(screen.getByText(/Throttle/)).toBeVisible();
    expect(screen.getByText(/Steering/)).toBeVisible();
  });
});
