import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";

import { Link } from "react-router-dom";
import styles from "./InboxList.module.css";

const InboxList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const { data } = await axiosReq.get("/inbox/");
        // Some endpoints return an object with a `results` array while others
        // return the array directly. Normalize the value so `messages` is
        // always an array.
        const inboxMessages = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
          ? data.results
          : [];
        setMessages(inboxMessages);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchInbox();
  }, []);

  if (loading) return <div>Loading...</div>;

  // Guard against unexpected data shapes to prevent runtime errors
  const messageList = Array.isArray(messages)
    ? messages
    : Array.isArray(messages?.results)
    ? messages.results
    : [];

  const sortedMessages = [...messageList].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <div className={styles.Container}>
      <h2 className={styles.Title}>Inbox</h2>
      {messageList.length === 0 && <div>No messages.</div>}
      <ul className={styles.List}>
        {sortedMessages.map((msg) => {
          const isRead =
            msg.read === true ||
            msg.read === "true" ||
            msg.read === 1 ||
            msg.read === "1";
          const formattedDate = new Date(msg.created_at).toLocaleDateString(
            "en-GB",
            { day: "2-digit", month: "short", year: "numeric" }
          );
          const preview = (msg.content || "")
            .replace(/\n+/g, " ")
            .trim()
            .slice(0, 100);
          return (
            <li key={msg.id} className={styles.Message}>
              <Link
                to={`/messages/${msg.id}/`}
                state={{ from: "inbox" }}
                className={styles.LinkCard}
              >
                <div className={styles.MessageHeader}>
                  <span className={styles.Date}>
                    <i className="fas fa-calendar-alt" /> {formattedDate}
                  </span>
                  {!isRead && <span className={styles.UnreadDot}></span>}
                </div>
                <p className={styles.Preview}>
                  📨 {preview}
                  {msg.content && msg.content.length > 100 ? "..." : ""}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}; 

export default InboxList;
