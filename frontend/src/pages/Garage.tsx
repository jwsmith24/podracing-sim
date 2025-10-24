import GarageTable from "@/components/GarageTable.tsx";
import { useGarage } from "@/hooks/useGarage.ts";
import { Spinner } from "@/components/ui/spinner.tsx";

export default function Garage() {
  const { data, loading, error, refetch } = useGarage();

  return (
    <div className={"h-full w-full flex flex-col justify-center"}>
      <h1 className={"text-yellow-400 font-bold p-2 text-center"}>Garage</h1>

      <div>
        {loading && <Spinner />}

        {error && <div className={"text-destructive"}>{error.message}</div>}

        {!loading && !error && <GarageTable pods={data} refetch={refetch} />}
      </div>
    </div>
  );
}
