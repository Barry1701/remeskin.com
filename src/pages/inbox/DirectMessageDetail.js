import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/DirectMessageDetail.module.css";

const DirectMessageDetail = () => {
  const { id } = useParams();
  const [msg, setMsg] = useState(null);
  const [mounted, setMounted] = useState(false);
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchMsg = async () => {
      try {
        const { data } = await axiosReq.get(`/messages/${id}/`);
        setMsg(data);
        // Mark as read only if the current user is the recipient
        if (
          data.recipient_username === currentUser?.username &&
          !data.read
        ) {
          await axiosReq.patch(`/messages/${id}/`, { read: true });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMsg();
  }, [id, currentUser]);

  if (!msg) return <div>Loading...</div>;

  const isRecipient = msg.recipient_username === currentUser?.username;
  const receiverLabel =
    msg.receiver_username ||
    msg.recipient_username ||
    msg.receiver ||
    msg.recipient;
  const cameFrom = location.state?.from;
  const backTarget =
    cameFrom === "inbox"
      ? "/inbox"
      : cameFrom === "outbox"
      ? "/outbox"
      : isRecipient
      ? "/inbox"
      : "/outbox";
  const backLabel = backTarget === "/inbox" ? "Inbox" : "Outbox";
  const formattedDate = new Date(msg.created_at).toLocaleDateString(
    "en-GB",
    { day: "2-digit", month: "short", year: "numeric" }
  );

  return (
    <div
      className={`${styles.Container} max-w-2xl mx-auto p-4 sm:p-6 rounded-xl ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } transition-all duration-500`}
    >
      <button
        onClick={() => navigate(backTarget)}
        className="text-sm text-blue-600 hover:underline mb-4"
      >
        ← Back to {backLabel}
      </button>
      <div className={styles.Card}>
        <div className={styles.Subject}>
          <span role="img" aria-label="subject">
            📧
          </span>
          <span>{msg.subject}</span>
        </div>
        <div className={styles.Meta}>
          <span role="img" aria-label="from">
            👤
          </span>
          <span>From:</span>
          <span>{msg.sender_username}</span>
        </div>
        {!isRecipient && (
          <div className={styles.Meta}>
            <span role="img" aria-label="to">
              👤
            </span>
            <span>To:</span>
            <span>{receiverLabel}</span>
          </div>
        )}
        <div className={styles.Content}>
          <span role="img" aria-label="message">
            💬
          </span>
          <span>{msg.content}</span>
        </div>
        <div className={styles.Date}>
          <span role="img" aria-label="date">
            📅
          </span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default DirectMessageDetail;
