import { io, Socket } from 'socket.io-client';

export class WebSocketService {
    private socket: Socket;
    private username: string;

    constructor(username: string) {
        this.username = username;
        this.socket = io('http://localhost:4025');
        this.socket.on('connect', () => {
            console.log('Connected to WebSocket server', username);
        });
        this.socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server', username);
        });
    }

    subscribeToJobEvents(
        onJobSent: (message: string) => void,
        onJobFailed: (message: string) => void,
        onJobSucceeded: (message: string) => void
    ) {
        this.socket.on(`job-sent-${this.username}`, (message) => onJobSent(message));
        this.socket.on(`job-failed-${this.username}`, (message) => onJobFailed(message));
        this.socket.on(`job-succeeded-${this.username}`, (message) => onJobSucceeded(message));
        // this.socket.on(`job-sent`, (message) => onJobSent(message));
        // this.socket.on('job-failed', (message) => onJobFailed(message));
        // this.socket.on(`job-succeeded-${this.username}`, (message) => onJobSucceeded(message));
    }

    unsubscribeFromJobEvents() {
        this.socket.off(`job-sent-${this.username}`);
        this.socket.off(`job-failed-${this.username}`);
        this.socket.off(`job-succeeded-${this.username}`);
    }

    disconnect() {
        this.socket.disconnect();
    }
}