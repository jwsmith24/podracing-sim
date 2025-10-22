import anakin_gif from "@/assets/podracing-gif.gif";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className={"h-full grid items-center justify-center"}>
      <h1 className={"text-center text-white"}>Podracing Sim</h1>
      <img src={anakin_gif} alt="Anakin starting his pod" />
      <Button className={"cursor-pointer"} onClick={() => navigate("/builder")}>
        Build Your Pod
      </Button>
    </div>
  );
}
