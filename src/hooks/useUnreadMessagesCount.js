import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";

export default function useUnreadMessagesCount() {
  const [count, setCount] = useState(0);

  const fetchCount = async () => {
    try {
      // GET all inbox messages where read=false
      const { data } = await axiosReq.get("/inbox/", {
        params: { read: false },
      });
      // support both paginated and non‑paginated responses
      const unread = Array.isArray(data)
        ? data.length
        : Array.isArray(data?.results)
        ? data.results.length
        : 0;
      setCount(unread);
    } catch (err) {
      console.error("Failed to fetch unread count:", err);
    }
  };

  useEffect(() => {
    fetchCount();
    // optional: poll or subscribe to real‑time events here
    // e.g. setInterval(fetchCount, 30000);
  }, []);

  return count;
}
