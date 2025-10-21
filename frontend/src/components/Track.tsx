import { useEffect, useRef, useState } from "react";
import { useControls } from "@/hooks/useControls.ts";
import { drawTrack } from "@/lib/trackRenderer.ts";
import type { PodState } from "@/types/PodState.ts";
import ControlsBox from "@/components/ControlsBox.tsx";
import { useRaceSocket } from "@/hooks/useRaceSocket.ts";
import ActivePodsTable from "@/components/ActivePodsTable.tsx";

export default function Track() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const controls = useControls();
  const [pods, setPods] = useState<Record<string, PodState>>({});
  const [racerId, setRacerId] = useState(
    "Player-" + Math.floor(Math.random() * 1000),
  );

  const { sendControl } = useRaceSocket(setPods);

  // send input every 100 ms
  useEffect(() => {
    const interval = setInterval(() => {
      sendControl(racerId, controls.throttle, controls.steering);
    }, 10);
    return () => clearInterval(interval);
  }, [controls, racerId, sendControl]);

  // render all pods on canvas when state updates

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawTrack(context);

    Object.values(pods).forEach((pod) => {
      context.save();
      context.translate(pod.x, pod.y);
      context.rotate(pod.angle);
      context.fillStyle = pod.playerId === racerId ? "orange" : "white";
      context.fillRect(-10, -5, 20, 10);
      context.restore();
    });
  }, [pods, racerId]);

  return (
    <div
      className={
        "flex flex-col justify-center items-center h-screen bg-black gap-4"
      }
    >
      <canvas
        role={"presentation"}
        ref={canvasRef}
        width={800}
        height={600}
        className={"border border-gray-600 bg-gray-900"}
      />
      <div className={"w-full flex"}>
        <div className={"w-1/2"}>
          <ControlsBox
            controls={controls}
            racerId={racerId}
            setRacerId={setRacerId}
          />
        </div>

        <div className={"w-1/2 text-white"}>
          <ActivePodsTable />
        </div>
      </div>
    </div>
  );
}
