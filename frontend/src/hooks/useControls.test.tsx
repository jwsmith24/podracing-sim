import { renderHook, act } from "@testing-library/react";
import { useControls } from "@/hooks/useControls.ts";

describe("useControls", () => {
  it("updates throttle and steering on key events", () => {
    const { result } = renderHook(() => useControls());

    // arrow up
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
    });
    expect(result.current.throttle).toBe(1);

    // arrow right
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    });
    expect(result.current.steering).toBe(1);

    // key releases
    act(() => {
      window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowUp" }));
      window.dispatchEvent(new KeyboardEvent("keyup", { key: "ArrowRight" }));
    });

    expect(result.current.throttle).toBe(0);
    expect(result.current.steering).toBe(0);
  });
});
