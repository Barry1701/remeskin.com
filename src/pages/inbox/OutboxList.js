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

  return (
    <div className={styles.Container}>
      <h2 className={styles.Title}>Outbox</h2>
      {messageList.length === 0 && <div>No sent messages.</div>}
      <ul className={styles.List}>
        {messageList.map((msg) => (
          <li key={msg.id} className={styles.Message}>
            <div>
              <b>To:</b> {msg.receiver_username || msg.recipient_username}
            </div>
            <div>
              <b>Subject:</b> {msg.subject}
            </div>
            <Link to={`/messages/${msg.id}`} className={styles.Link}>
              View
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OutboxList;
