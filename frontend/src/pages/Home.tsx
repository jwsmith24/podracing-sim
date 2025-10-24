import podracing from "@/assets/star_wars_podrace-gif.gif";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={"h-full grid items-center  w-full"}>
      <h1
        className={"text-center text-yellow-400 font-extrabold text-6xl my-4"}
      >
        Podracing Sim
      </h1>
      <img
        src={podracing}
        alt={"Anakin starting his pod"}
        className={"w-full"}
      />
      <div className={"flex justify-center mb-4"}>
        <Button
          className={"cursor-pointer w-1/3 hover:text-white"}
          onClick={() => navigate("/builder")}
        >
          Build Your Pod
        </Button>
      </div>
    </div>
  );
}
