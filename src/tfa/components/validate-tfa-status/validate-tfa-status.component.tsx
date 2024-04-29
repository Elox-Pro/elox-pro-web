import { Socket, io } from "socket.io-client";
import { useAppSelector } from "../../../app/hooks/app.hooks";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { WS_URL } from "../../../app/constants/app.constants";

/**
 * Component to validate Two-Factor Authentication (TFA) status using WebSocket events.
 * Handles success and failure events and displays corresponding toast messages.
 * Connects to a WebSocket server to listen for specific TFA events.
 * @author Yonatan A Quintero R
 * @date 2024-04-29
 */
export default function ValidateTfaStatus() {
    const { t } = useTranslation("tfa", { keyPrefix: "validate-tfa-status" });
    const { tfaUsername } = useAppSelector((state) => state.tfa);

    /**
     * Gets the full event name based on the provided event name and optional ID.
     *
     * @param {string} eventName - The base event name.
     * @param {string | null} id - Optional ID to append to the event name.
     * @returns {string} - The full event name.
     */
    const getFullEventName = (eventName: string, id: string | null): string => {
        if (id) return `${eventName}:${id}`;
        return eventName;
    };

    /**
     * Handles a failed TFA event by displaying an error toast and logging the data.
     *
     * @param {any} data - Data related to the failed event.
     */
    const handleFailedEvent = (data: any): void => {
        toast.error(t('failed'));
        console.error(data);
    };

    /**
     * Handles a succeeded TFA event by displaying a success toast.
     */
    const handleSucceededEvent = (): void => {
        toast.success(t('succeeded'));
    };

    /**
     * Initializes the WebSocket connection and sets up event listeners.
     *
     * @returns {Socket} - The initialized WebSocket instance.
     */
    const initializeSocket = (): Socket => {
        const socket: Socket = io(WS_URL);

        socket.on('connect', () => {
            console.info('Connected to WebSocket server');
        });

        socket.on('disconnect', () => {
            console.info('Disconnected from WebSocket server');
        });

        socket.on(getFullEventName('tfa-failed', tfaUsername), handleFailedEvent);
        socket.on(getFullEventName('tfa-succeeded', tfaUsername), handleSucceededEvent);

        return socket;
    };

    useEffect(() => {
        const socket = initializeSocket();

        return () => {
            console.info('Disconnected from WebSocket server');
            socket.off(getFullEventName('tfa-failed', tfaUsername), handleFailedEvent);
            socket.off(getFullEventName('tfa-succeeded', tfaUsername), handleSucceededEvent);
            socket.disconnect();
        };
    }, [tfaUsername]);

    return null; // This component does not render anything
}