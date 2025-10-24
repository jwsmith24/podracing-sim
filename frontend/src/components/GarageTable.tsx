import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { type PodBuildData } from "@/types/PodBuilderData.ts";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Dialog, DialogContent } from "@/components/ui/dialog.tsx";

import PodBuilder from "@/components/PodBuilder.tsx";

import { deletePod } from "@/api/garageAPI.ts";
import { toast } from "sonner";

interface GarageTableProps {
  pods: PodBuildData[];
  refetch: () => Promise<void>;
}
export default function GarageTable({ pods, refetch }: GarageTableProps) {
  const formatValue = (value: number) => {
    return Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const [activePod, setActivePod] = useState<PodBuildData>();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const openDialog = () => {
    if (!activePod) return;
    setEditDialogOpen(true);
  };

  const closeDialog = async () => {
    await refetch();
    setEditDialogOpen(false);
  };

  const handleDelete = async () => {
    if (!activePod || !activePod.id) return;

    await deletePod(activePod.id);
    await refetch();
    toast.success("Pod deleted!");
  };

  return (
    <>
      <div className={"bg-card m-4 p-4 rounded-xl shadow-xl"}>
        <Table>
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
                  className={`cursor-pointer ${activePod?.id === pod.id ? "bg-primary hover:bg-primary font-semibold" : ""} transition-all ease-in-out`}
                  onClick={() => setActivePod(pod)}
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
        <section
          className={
            "mt-4 flex items-center justify-end gap-4 transition-all ease-in-out"
          }
        >
          {activePod && (
            <>
              <Button
                className={`bg-white hover:bg-green-400`}
                onClick={openDialog}
              >
                Update
              </Button>
              <Button
                className={` hover:bg-primary bg-white`}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </>
          )}
        </section>
      </div>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <PodBuilder editMode={true} pod={activePod} onClose={closeDialog} />
        </DialogContent>
      </Dialog>
    </>
  );
}
