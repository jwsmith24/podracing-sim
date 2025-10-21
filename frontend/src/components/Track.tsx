import { useEffect, useRef, useState } from "react";
import { useControls } from "@/hooks/useControls.ts";
import { drawTrack } from "@/lib/trackRenderer.ts";
import type { PodState } from "@/types/PodState.ts";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";

const FRICTION = 0.95;
const ACCELERATION = 100; // pixels per second
const STEERING_SENSITIVITY = 2; // radians per second
const PADDING = 10; // keep the pod inside the canvas

export default function Track() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const controls = useControls();

  const [racerId, setRacerId] = useState(
    "Player-" + Math.floor(Math.random() * 1000),
  );
  const [racerIdInput, setRacerIdInput] = useState(racerId);
  const [hasSetId, setHasSetId] = useState(false);

  const [pods, setPods] = useState<Record<string, PodState>>({});
  const playerId = "Player-";

  const controlsRef = useRef(controls);

  // sync controls ref
  useEffect(() => {
    controlsRef.current = controls;
  }, [controls]);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;

    let lastTime = performance.now();
    let frameId: number;

    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const pod = podRef.current;
      const { throttle, steering } = controlsRef.current;

      if (throttle > 0) {
        pod.velocity += ACCELERATION * dt;
      } else if (throttle < 0) {
        pod.velocity = 0; // brake
      } else {
        pod.velocity *= FRICTION; // coasting friction
      }

      pod.angle += steering * STEERING_SENSITIVITY * dt;

      pod.x += pod.velocity * Math.cos(pod.angle) * dt;
      pod.y += pod.velocity * Math.sin(pod.angle) * dt;

      // track boundaries
      const maxX = context.canvas.width - PADDING;
      const maxY = context.canvas.height - PADDING;
      const minX = PADDING;
      const minY = PADDING;

      // clamp movement to the track boundaries and set velocity to 0 (simulating crash)
      if (pod.x < minX) {
        pod.x = minX;
        pod.velocity = 0;
      }
      if (pod.x > maxX) {
        pod.x = maxX;
        pod.velocity = 0;
      }
      if (pod.y < minY) {
        pod.y = minY;
        pod.velocity = 0;
      }
      if (pod.y > maxY) {
        pod.y = maxY;
        pod.velocity = 0;
      }

      // clear and redraw
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
      drawTrack(context);

      // draw pod
      context.save();
      context.translate(pod.x, pod.y);
      context.rotate(pod.angle);
      context.fillStyle = "orange";
      context.fillRect(-10, -5, 20, 10);
      context.restore();

      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div
      className={"flex flex-col justify-center items-center h-screen bg-black"}
    >
      <canvas
        role={"presentation"}
        ref={canvasRef}
        width={800}
        height={600}
        className={"border border-gray-600 bg-gray-900"}
      />
      <div
        className={
          "text-white grid gap-4 border w-1/3 p-4 m-4 rounded-xl justify-start "
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
              "cursor-pointer hover:bg-green-400 " +
              `${hasSetId ? "hidden" : ""}`
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
    </div>
  );
}
