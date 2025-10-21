import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table.tsx";
import { usePods } from "@/hooks/usePods.ts";
import { Spinner } from "@/components/ui/spinner.tsx";
import { useRaceSocket } from "@/hooks/useRaceSocket.ts";
import type { PodState } from "@/types/PodState.ts";

export default function ActivePodsTable() {
  const { data, loading, error, setData } = usePods();

  // connect to the websocket for latest data
  useRaceSocket((pods: Record<string, PodState>) => {
    const podList = Object.values(pods);
    setData(podList);
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className={"text-white"}>Racer ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading && (
          <TableRow>
            <TableCell>
              <Spinner />
            </TableCell>
          </TableRow>
        )}

        {error && (
          <TableRow>
            <TableCell className="text-red-400">{error.message}</TableCell>
          </TableRow>
        )}
        {!loading && !error && data.length === 0 && (
          <TableRow>
            <TableCell className="text-center text-gray-400">
              No active pods
            </TableCell>
          </TableRow>
        )}

        {Array.isArray(data) &&
          data.map((pod) => (
            <TableRow key={pod.playerId}>
              <TableCell>{pod.playerId}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
