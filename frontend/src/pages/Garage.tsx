import GarageTable from "@/components/GarageTable.tsx";
import { useGarage } from "@/hooks/useGarage.ts";
import { Spinner } from "@/components/ui/spinner.tsx";

export default function Garage() {
  const { data, loading, error, refetch } = useGarage();

  return (
    <div className={"h-full w-full grid"}>
      <h1 className={"text-white font-bold p-2 "}>Garage</h1>
      <div>
        {loading && <Spinner />}

        {error && <div className={"text-red-400"}>{error.message}</div>}

        {!loading && !error && <GarageTable pods={data} refetch={refetch} />}
      </div>
    </div>
  );
}
