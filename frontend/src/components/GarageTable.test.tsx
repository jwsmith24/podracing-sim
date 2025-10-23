import GarageTable from "@/components/GarageTable.tsx";
import { render, screen, within } from "@testing-library/react";
import { mockPods } from "@/types/PodBuilderData.ts";

describe("Garage table", () => {
  it("should display a caption describing the list", () => {
    render(<GarageTable pods={mockPods} />);
    expect(
      screen.getByRole("caption", { name: /build some more pods/i }),
    ).toBeVisible();
  });

  it("should have columns for all pod builder attributes", () => {
    render(<GarageTable pods={mockPods} />);
    expect(screen.getByText(/engine count/i)).toBeVisible();
    expect(screen.getByText(/name/i)).toBeVisible();
    expect(screen.getByText(/color/i)).toBeVisible();
    expect(screen.getByText(/armor rating/i)).toBeVisible();
    expect(screen.getByText(/value/i)).toBeVisible();
  });

  it("should render 10 mock pods in the table plus header row (11 total)", () => {
    render(<GarageTable pods={mockPods} />);
    const tableRows = screen.getAllByRole("row");

    expect(tableRows.length).toEqual(11);
  });

  it("should render the correct data for the mock pods", () => {
    render(<GarageTable pods={mockPods} />);
    const firstPodRow = screen.getAllByRole("row")[1]; // skip header row
    const cells = within(firstPodRow).getAllByRole("cell");

    expect(cells[0]).toHaveTextContent(mockPods[0].name);
    expect(cells[1]).toHaveTextContent(mockPods[0].engineCount.toString());
    expect(cells[3]).toHaveTextContent(mockPods[0].armorRating.toString());
  });
});
