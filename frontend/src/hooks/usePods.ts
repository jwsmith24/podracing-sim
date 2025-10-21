import { useCallback, useEffect, useState } from "react";
import type { PodState } from "@/types/PodState.ts";
import { getActivePods } from "@/api/pods.ts";

export function usePods() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PodState[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const fetchActivePods = useCallback(async () => {
    try {
      setLoading(true);
      const podMap = await getActivePods();
      const pods = Object.values(podMap) as PodState[]; // map to array
      setData(pods);
      setError(null);
      console.log("got pods: ", pods);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchActivePods();
  }, [fetchActivePods]);

  return { data, setData, loading, error, refetch: fetchActivePods };
}
