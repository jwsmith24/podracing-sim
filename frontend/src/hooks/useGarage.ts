import { useCallback, useEffect, useState } from "react";
import type { PodBuildData } from "@/types/PodBuilderData.ts";
import { getPods } from "@/api/staticPods.ts";

export function useGarage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PodBuildData[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const fetchPods = useCallback(async () => {
    try {
      setLoading(true);
      const pods = await getPods();
      setData(pods);
      console.log("got pods: ", pods);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchPods();
  }, [fetchPods]);

  return { data, loading, error, refetch: fetchPods };
}
