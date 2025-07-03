import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";

export default function useUnreadMessagesCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    const fetchCount = async () => {
      try {
        const { data } = await axiosReq.get("/inbox/?read=false");
        const items = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
          ? data.results
          : [];
        if (mounted) {
          setCount(items.length);
        }
      } catch {
        // ignore
      }
    };
    fetchCount();
    const interval = setInterval(fetchCount, 30000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return count;
}
