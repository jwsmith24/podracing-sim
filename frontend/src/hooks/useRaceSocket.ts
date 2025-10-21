import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import type { PodState } from "@/types/PodState.ts";

export function useRaceSocket(
  onUpdate: (pods: Record<string, PodState>) => void,
) {
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to backend!");
        client.subscribe("/topic/race/global", (message) => {
          const data = JSON.parse(message.body) as Record<string, PodState>;
          onUpdate(data); // pass updated pods map back to track component
        });
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (client.active) {
        void client.deactivate();
      }
    };
  }, [onUpdate]);

  const sendControl = (
    playerId: string,
    throttle: number,
    steering: number,
  ) => {
    if (!clientRef.current?.connected) return;

    clientRef.current.publish({
      destination: "/app/race/control",
      body: JSON.stringify({ playerId, throttle, steering }),
    });
  };

  return { sendControl };
}
