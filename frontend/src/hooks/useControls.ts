import { useEffect, useState } from "react";

export interface Controls {
  throttle: number;
  steering: number;
}

export function useControls(): Controls {
  const [controls, setControls] = useState<Controls>({
    throttle: 0,
    steering: 0,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") setControls((c) => ({ ...c, throttle: 1 }));
      if (e.key === "ArrowDown") {
        setControls({ steering: 0, throttle: -1 });
        return;
      }

      if (e.key === "ArrowLeft") setControls((c) => ({ ...c, steering: -1 }));
      if (e.key === "ArrowRight") setControls((c) => ({ ...c, steering: 1 }));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown"].includes(e.key)) {
        setControls((c) => ({ ...c, throttle: 0 }));
      }

      if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
        setControls((c) => ({ ...c, steering: 0 }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      // clean up on unmount
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return controls;
}
