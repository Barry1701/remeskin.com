import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";
import {
  Calendar,
  Mail,
  Check,
  Dot,
  User as UserIcon,
} from "lucide-react";
import styles from "../../styles/OutboxList.module.css";

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
              <Link
                className={styles.MessageLink}
                to={`/messages/${msg.id}`}
                state={{ from: "outbox" }}
              >
                <div className={styles.Row}>
                  <Calendar className={styles.Icon} />
                  <span className={styles.Date}>
                    {formatDate(msg.created_at || msg.timestamp)}
                  </span>
                </div>
                <div className={styles.Row}>
                  <Mail className={styles.Icon} />
                  <span className={styles.Subject}>{msg.subject}</span>
                </div>
                <div className={styles.Recipient}>
                  <UserIcon className={styles.Icon} /> To: {msg.recipient_username}
                </div>
                {msg.readByRecipient ? (
                  <Check className={styles.StatusIcon} />
                ) : (
                  <Dot className={styles.StatusIcon} />
                )}
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
