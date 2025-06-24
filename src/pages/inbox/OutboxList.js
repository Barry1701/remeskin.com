import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/OutboxList.module.css";
import { Link } from "react-router-dom";

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
              <Link to={`/messages/${msg.id}`}>
                <p className={styles.Subject}>📝 {msg.subject}</p>
                <p className={styles.Info}>📨 To: {msg.recipient}</p>
                <p className={styles.Date}>📅 {msg.created_at?.slice(0, 10)}</p>
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
