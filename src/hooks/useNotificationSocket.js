import { useEffect, useState, useRef } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

export default function useNotificationSocket() {
  const [notifications, setNotifications] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "test") return;
    // choose ws:// or wss:// based on page protocol
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const socketUrl = `${protocol}://${window.location.host}/ws/notifications/`;
    wsRef.current = new ReconnectingWebSocket(socketUrl);

    wsRef.current.onmessage = ({ data }) => {
      try {
        const event = JSON.parse(data);
        // push into array
        setNotifications((prev) => [...prev, event]);
      } catch (e) {
        console.error("Invalid WebSocket payload:", e);
      }
    };

    return () => {
      wsRef.current.close();
    };
  }, []);

  const clearNotifications = () => {
    setNotifications([]);
  };

  return { notifications, clearNotifications };
}
