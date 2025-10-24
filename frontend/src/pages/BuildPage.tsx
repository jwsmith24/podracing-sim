import PodBuilder from "@/components/PodBuilder.tsx";
import anakinPath from "@/assets/podracing-gif.gif";

export default function BuildPage() {
  return (
    <div className={"grid items-center h-full my-6"}>
      <PodBuilder editMode={false} />
      <div className={"flex justify-center w-full p-16"}>
        <img
          src={anakinPath}
          alt="anakin getting his pod to work for the first time"
          className={"w-[800px] rounded-xl shadow-xl"}
        />
      </div>
    </div>
  );
}
