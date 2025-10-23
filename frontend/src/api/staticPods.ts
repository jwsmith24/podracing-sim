import axios from "axios";
import type { PodBuildData } from "@/types/PodBuilderData.ts";

export const getPods = async () => {
  const path = "/api/garage";
  const result = await axios.get(path);

  return result.data;
};

export const createPod = async (pod: PodBuildData) => {
  const path = "/api/garage";
  const result = await axios.post(path, pod);
  console.log("created new pod: ", result.data);

  return result.data;
};

export const updatePod = async (updatedPod: Partial<PodBuildData>) => {
  const path = `/api/garage/${updatedPod.id}`;
  const result = await axios.patch(path, updatedPod);

  console.log("updated pod: ", result.data);
  return result.data;
};

export const deletePod = async (podId: number) => {
  const path = `/api/garage/${podId}`;
  const result = await axios.delete(path);

  console.log(`deleted pod with id ${podId}.. got: `, result.data);

  return result.data;
};
