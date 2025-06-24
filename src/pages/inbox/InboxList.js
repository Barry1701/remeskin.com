import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Mail, User } from "lucide-react";
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

  return (
    <div className={styles.Container}>
      <h2 className={styles.Title}>Inbox</h2>
      {messageList.length === 0 && <div>No messages.</div>}
      <ul className={styles.List}>
        {messageList.map((msg) => {
          const isRead =
            msg.read === true ||
            msg.read === "true" ||
            msg.read === 1 ||
            msg.read === "1";
          return (
            <li key={msg.id} className={styles.Message}>
              <div className={styles.MessageHeader}>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="font-semibold">From:</span>
                  <span>{msg.sender_username}</span>
                </div>
                {!isRead && <span className={styles.UnreadDot}></span>}
              </div>
              <div className={styles.MessageBody}>
                <Mail className="w-4 h-4" />
                <span className="font-semibold">Subject:</span>
                <span>{msg.subject}</span>
              </div>
              <div className={styles.MessageFooter}>
                <Link
                  to={`/messages/${msg.id}/`}
                  state={{ from: "inbox" }}
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

export default InboxList;
