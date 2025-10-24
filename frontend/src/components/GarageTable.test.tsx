import GarageTable from "@/components/GarageTable.tsx";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { mockPods } from "@/types/PodBuilderData.ts";
import { vi } from "vitest";

const refetch = vi.fn();

// mock dependencies
vi.mock("@/api/garageAPI.ts");
vi.mock("@/pages/PodBuilder.tsx");

describe("Garage table", () => {
  it("should have columns for all pod builder attributes", () => {
    render(<GarageTable pods={mockPods} refetch={refetch} />);
    expect(screen.getByText(/engine count/i)).toBeVisible();
    expect(screen.getByText(/name/i)).toBeVisible();
    expect(screen.getByText(/color/i)).toBeVisible();
    expect(screen.getByText(/armor rating/i)).toBeVisible();
    expect(screen.getByText(/value/i)).toBeVisible();
  });

  it("should render 10 mock pods in the table plus header row (11 total)", () => {
    render(<GarageTable pods={mockPods} refetch={refetch} />);
    const tableRows = screen.getAllByRole("row");

    expect(tableRows.length).toEqual(11);
  });

  it("should render the correct data for the mock pods", () => {
    render(<GarageTable pods={mockPods} refetch={refetch} />);
    const firstPodRow = screen.getAllByRole("row")[1]; // skip header row
    const cells = within(firstPodRow).getAllByRole("cell");

    expect(cells[0]).toHaveTextContent(mockPods[0].name);
    expect(cells[1]).toHaveTextContent(mockPods[0].engineCount.toString());
    expect(cells[3]).toHaveTextContent(mockPods[0].armorRating.toString());
  });

  it("should highlight the active pod when clicked", async () => {
    render(<GarageTable pods={mockPods} refetch={refetch} />);
    const firstRow = screen.getAllByRole("row")[1]; // skip header

    fireEvent.click(firstRow);

    expect(firstRow.className).toContain("bg-primary");
  });

  it("should show the update and delete buttons when a pod is selected", async () => {
    render(<GarageTable pods={mockPods} refetch={refetch} />);

    expect(
      screen.queryByRole("button", { name: /update/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /delete/i }),
    ).not.toBeInTheDocument();

    const firstRow = screen.getAllByRole("row")[1]; // skip header row
    fireEvent.click(firstRow);

    expect(screen.getByRole("button", { name: /update/i })).toBeVisible();
    expect(screen.getByRole("button", { name: /delete/i })).toBeVisible();
  });
});
