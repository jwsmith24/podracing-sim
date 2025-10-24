// mock axios

import { vi } from "vitest";
import axios from "axios";
import { createPod, deletePod, getPods, updatePod } from "@/api/garageAPI.ts";
import type { PodBuildData } from "@/types/PodBuilderData.ts";

vi.mock("axios");
const mockedAxios = vi.mocked(axios, true);

describe("Garage API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch pods", async () => {
    const mockPods = [{ id: 1, name: "test-pod" }];
    mockedAxios.get = vi.fn().mockResolvedValueOnce({ data: mockPods });

    const result = await getPods();

    expect(mockedAxios.get).toHaveBeenCalledWith("/api/garage");
    expect(result).toEqual(mockPods);
  });

  it("should create a new pod", async () => {
    const newPod: PodBuildData = {
      id: 2,
      name: "test-racer",
      engineCount: 2,
      armorRating: 4,
      color: "#ffffff",
    };

    mockedAxios.post.mockResolvedValueOnce({ data: newPod });

    const result = await createPod(newPod);

    expect(mockedAxios.post).toHaveBeenCalledWith("/api/garage", newPod);
    expect(result).toEqual(newPod);
  });

  it("should update an existing pod", async () => {
    const updatedPod: Partial<PodBuildData> = { id: 2, armorRating: 2 };
    mockedAxios.patch.mockResolvedValueOnce({ data: updatedPod });

    const result = await updatePod(updatedPod);

    expect(mockedAxios.patch).toHaveBeenCalledWith("/api/garage/2", updatedPod);
    expect(result).toEqual(updatedPod);
  });

  it("should delete an existing pod by id", async () => {
    mockedAxios.delete.mockResolvedValueOnce({ data: { success: true } });

    const result = await deletePod(2);

    expect(mockedAxios.delete).toHaveBeenCalledWith("/api/garage/2");
    expect(result).toEqual({ success: true });
  });
});
