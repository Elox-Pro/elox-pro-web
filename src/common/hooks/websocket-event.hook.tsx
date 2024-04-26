import { useEffect } from "react";
import { useWebSocketService } from "./websocket-service.hook";

type webSocketEventProps = {
    eventHandlers: Record<string, (message: string) => void>
    id: string | null
}
export function useWebSocketEvent({ eventHandlers, id }: webSocketEventProps) {

    const socket = useWebSocketService();
    const getFullEventName = (eventName: string, id: string | null) => {
        if (id) return `${eventName}:${id}`
        return eventName;
    }

    useEffect(() => {
        const eventNames = Object.keys(eventHandlers);
        const unsubscribeFunctions: (() => void)[] = [];

        eventNames.forEach(eventName => {
            const handler = eventHandlers[eventName];
            const eventFullName = getFullEventName(eventName, id);
            const unsubscribe = () => socket.off(eventFullName, handler);
            socket.on(eventFullName, handler);
            unsubscribeFunctions.push(unsubscribe);
        });

        return () => {
            unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
        };
    }, [socket, id, eventHandlers]);
}