import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";

/**
 * Hook zwraca liczbę nieprzeczytanych wiadomości w inbox
 * i odświeża ją co 30 sekund.
 */
export default function useUnreadMessagesCount() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchCount = async () => {
      try {
        // Zakładam, że GET /inbox/ zwraca paginowane results
        const { data } = await axiosReq.get("/inbox/?read=false");
        const items = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
          ? data.results
          : [];
        if (isMounted) {
          setUnreadCount(items.length);
        }
      } catch (err) {
        console.error("Failed to fetch unread count", err);
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return unreadCount;
}
