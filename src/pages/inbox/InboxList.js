import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/MessageList.module.css";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const InboxList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const { data } = await axiosReq.get("/inbox/");
        const inboxMessages = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
          ? data.results
          : [];
        setMessages(inboxMessages);
      } catch {
        /* handle error */
      }
      setLoading(false);
    };
    fetchInbox();
  }, []);

  return (
    <div className={styles.Container}>
      <h2 className={styles.Title}>📥 Inbox</h2>
      {loading ? (
        <p>Loading...</p>
      ) : messages.length ? (
        <ul className={styles.List}>
          {messages.map((msg) => (
            <li key={msg.id} className={styles.Message}>
              <Link className={styles.MessageLink} to={`/messages/${msg.id}`}>
                <p className={styles.Date}>📅 {formatDate(msg.created_at)}</p>
                <p className={styles.Subject}>✉️ {msg.subject}</p>
                <p className={styles.Info}>
                  👤 From: {msg.sender_username}
                </p>
                {/* nieprzeczytane tylko jeśli to Twój inbox */}
                {msg.read === false &&
                  msg.recipient_username === currentUser?.username && (
                    <span className={styles.UnreadDot} />
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

export default InboxList;
