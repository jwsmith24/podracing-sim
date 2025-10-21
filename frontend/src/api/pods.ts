import axios from "axios";

export const getActivePods = async () => {
  const path = "http://localhost:8080/api/race/pods";
  const result = await axios.get(path);

  return result.data;
};
