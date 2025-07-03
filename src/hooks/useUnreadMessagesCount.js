import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../api/axiosDefaults";

/**
 * Returns the number of unread direct messages for the current user.
 * Re-fetches automatically whenever the route changes.
 */
const useUnreadMessagesCount = () => {
  const [count, setCount] = useState(0);
  const { pathname } = useLocation();

  const fetchCount = async () => {
    try {
      // your API returns an array or a paginated object
      const { data } = await axiosReq.get("/inbox/?read=false");
      let newCount = 0;
      if (Array.isArray(data)) {
        newCount = data.length;
      } else if (Array.isArray(data.results)) {
        newCount = data.results.length;
      } else if (typeof data.count === "number") {
        newCount = data.count;
      }
      setCount(newCount);
    } catch (err) {
      console.error("Failed to fetch unread count:", err);
    }
  };

  useEffect(() => {
    fetchCount();
  }, [pathname]);

  return count;
};

export default useUnreadMessagesCount;
