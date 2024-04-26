import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
export function useWebSocketService() {
    // TODO: get url connection from config
    const socket: Socket = io("http://localhost:4025");

    useEffect(() => {
        socket.on('connect', () => {
            console.info('Connected to WebSocket server');
        });

        socket.on('disconnect', () => {
            console.info('Disconnected from WebSocket server');
        });

        return () => {
            console.info('Disconnecting from WebSocket server');
            socket.disconnect();
        }
    }, [socket]);

    return socket;
}