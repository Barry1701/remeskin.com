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
          (data.recipient_username === currentUser?.username ||
            data.receiver_username === currentUser?.username ||
            data.to_user?.username === currentUser?.username ||
            data.recipient === currentUser?.username ||
            data.receiver === currentUser?.username) &&
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

  const isRecipient =
    msg.recipient_username === currentUser?.username ||
    msg.receiver_username === currentUser?.username ||
    msg.to_user?.username === currentUser?.username ||
    msg.recipient === currentUser?.username ||
    msg.receiver === currentUser?.username;
  // const isSender =
  //   msg.sender_username === currentUser?.username ||
  //   msg.owner === currentUser?.username;
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
        <div className={styles.Date}>📅 {formattedDate}</div>
        <div className={styles.Content}>📨 {msg.content?.trim() || "No message content."}</div>
      </div>
    </div>
  );
};

export default DirectMessageDetail;
