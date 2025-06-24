import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/OutboxList.module.css";
import { Link } from "react-router-dom";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const OutboxList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOutbox = async () => {
      try {
        const { data } = await axiosReq.get("/outbox/");
        const outboxMessages = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
          ? data.results
          : [];

        setMessages(outboxMessages);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchOutbox();
  }, []);

  return (
    <div className={styles.Container}>
      <h2 className={styles.Title}>📤 Outbox</h2>
      {loading ? (
        <p>Loading...</p>
      ) : messages.length ? (
        <ul className={styles.List}>
          {messages.map((msg) => (
            <li key={msg.id} className={styles.Message}>
              <p className={styles.Date}>📅 {formatDate(msg.created_at)}</p>
              <p className={styles.Subject}>📧 {msg.subject}</p>
              <p className={styles.Info}>
                👤 To: {msg.recipient_username || msg.recipient}
              </p>
              <p className={styles.Info}>👤 From: Me</p>
              <Link
                className={styles.ReadLink}
                to={`/messages/${msg.id}`}
                state={{ from: "outbox" }}
              >
                Read
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No messages</p>
      )}
    </div>
  );
};

export default OutboxList;
