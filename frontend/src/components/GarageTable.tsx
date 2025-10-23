import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { type PodBuildData } from "@/types/PodBuilderData.ts";

interface GarageTableProps {
  pods: PodBuildData[];
}
export default function GarageTable({ pods }: GarageTableProps) {
  const formatValue = (value: number) => {
    return Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
  return (
    <div className={"bg-white m-4 p-4 rounded-xl shadow-xl"}>
      <Table>
        <TableCaption>Build some more pods</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Engine Count</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Armor Rating</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pods.map((pod, index) => {
            return (
              <TableRow
                key={pod?.id ?? index}
                role={"row"}
                className={"cursor-pointer"}
              >
                <TableCell>{pod.name}</TableCell>
                <TableCell>{pod.engineCount}</TableCell>
                <TableCell>
                  <div
                    className={`w-8 h-6 rounded border-slate-400 shadow-lg`}
                    style={{ backgroundColor: pod.color }}
                    aria-label={`Color ${pod.color}`}
                  ></div>
                </TableCell>
                <TableCell>{pod.armorRating}</TableCell>
                <TableCell>
                  {pod.value ? formatValue(pod.value) : formatValue(100)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
