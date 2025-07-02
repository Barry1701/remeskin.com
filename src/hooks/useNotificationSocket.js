import { useEffect, useState, useCallback } from "react";

const useNotificationSocket = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // budujemy URL np. wss://host/ws/notifications/
    const wsProtocol = process.env.REACT_APP_WS_BASE_URL.startsWith("https")
      ? "wss"
      : "ws";
    const wsUrl = `${process.env.REACT_APP_WS_BASE_URL.replace(
      /^https?:\/\//,
      wsProtocol + "://"
    )}/ws/notifications/`;

    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log("🔔 WebSocket connected:", wsUrl);
    };

    socket.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        // payload: { message: "...", id: 123 }
        setNotifications((prev) => [...prev, payload]);
      } catch (err) {
        console.error("WS parse error:", err);
      }
    };

    socket.onerror = (err) => {
      console.error("🔔 WebSocket error:", err);
    };

    socket.onclose = (e) => {
      console.log("🔔 WebSocket closed:", e.code, e.reason);
    };

    return () => {
      socket.close();
    };
  }, []);

  const clearNotifications = useCallback(() => setNotifications([]), []);

  return { notifications, clearNotifications };
};

export default useNotificationSocket;
