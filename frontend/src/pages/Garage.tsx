import GarageTable from "@/components/GarageTable.tsx";
import { mockPods } from "@/types/PodBuilderData.ts";

export default function Garage() {
  return (
    <div className={"h-full w-full grid"}>
      <h1 className={"text-white font-bold p-2 "}>Garage</h1>
      <div>
        <GarageTable pods={mockPods} />
      </div>
    </div>
  );
}
