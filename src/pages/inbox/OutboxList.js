import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";

import { Link } from "react-router-dom";
import styles from "../../styles/OutboxList.module.css";

const OutboxList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOutbox = async () => {
      try {
        const { data } = await axiosReq.get("/outbox/");
        // Some endpoints return an object with a `results` array while others
        // return the array directly. Normalize the value so `messages` is
        // always an array.
        const outboxMessages = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
          ? data.results
          : [];
        // Mark outbox messages as read by default so they aren't shown as unread
        const markedRead = outboxMessages.map((msg) => ({ ...msg, read: true }));
        setMessages(markedRead);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchOutbox();
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
      <h2 className={styles.Title}>Outbox</h2>
      {messageList.length === 0 && <div>No sent messages.</div>}
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
          return (
            <li key={msg.id} className={styles.Message}>
              <div className={styles.MessageHeader}>
                <span className={styles.Date}>
                  <i className="fas fa-calendar-alt" /> {formattedDate}
                </span>
                {!isRead && <span className={styles.UnreadDot}></span>}
              </div>
              <div className={styles.Meta}>
                <span className={styles.MetaItem}>
                  <i className="fas fa-user" /> To:&nbsp;
                  {msg.recipient_username ||
                    msg.receiver_username ||
                    msg.to_user?.username ||
                    msg.recipient ||
                    msg.receiver}
                </span>
                <span className={styles.MetaItem}>
                  <i className="fas fa-envelope" /> Subject:&nbsp;
                  {msg.subject}
                </span>
              </div>
              <div className={styles.MessageFooter}>
                <Link
                  to={`/messages/${msg.id}/`}
                  state={{ from: "outbox" }}
                  className={styles.Link}
                >
                  Read
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OutboxList;
