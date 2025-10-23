import axios from "axios";

export const getActivePods = async () => {
  const path = "/api/race/pods";
  const result = await axios.get(path);

  return result.data;
};
