import { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

export default function useUnreadMessagesCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    async function fetchCount() {
      try {
        const { data } = await axiosReq.get("/inbox/?read=false");
        if (isMounted) {
          setCount(Array.isArray(data) ? data.length : data.results.length);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchCount();
    return () => { isMounted = false; };
  }, []);

  return count;
}
