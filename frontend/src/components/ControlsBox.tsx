import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { type Dispatch, type SetStateAction, useState } from "react";
import type { Controls } from "@/hooks/useControls.ts";

interface ControlsBoxProps {
  controls: Controls;
  racerId: string;
  setRacerId: Dispatch<SetStateAction<string>>;
}

export default function ControlsBox({
  controls,
  racerId,
  setRacerId,
}: ControlsBoxProps) {
  const [racerIdInput, setRacerIdInput] = useState(racerId);
  const [hasSetId, setHasSetId] = useState(false);

  return (
    <div
      className={
        "text-white grid gap-4 border p-4 m-4 rounded-xl justify-start "
      }
    >
      <h2 className={"font-bold text-2xl"}>Controls</h2>
      <p>Throttle: {controls.throttle}</p>
      <p>Steering: {controls.steering}</p>
      <div className={"flex gap-4"}>
        <Label htmlFor={"racer-id-input"}>
          {" "}
          Racer:
          <Input
            name={"racer-id-input"}
            value={racerIdInput}
            onChange={(event) => setRacerIdInput(event.target.value)}
            disabled={hasSetId}
          ></Input>
        </Label>
        <Button
          className={
            "cursor-pointer hover:bg-green-400 " + `${hasSetId ? "hidden" : ""}`
          }
          onClick={() => {
            setRacerId(racerIdInput);
            setHasSetId(true);
          }}
          disabled={hasSetId}
        >
          Set RacerID
        </Button>
      </div>
    </div>
  );
}
