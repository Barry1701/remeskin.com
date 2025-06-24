import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/DirectMessageDetail.module.css";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

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

        if (
          data.recipient_username === currentUser?.username ||
          data.sender_username === currentUser?.username
        ) {
          setMsg(data);
        } else {
          navigate("/notfound");
        }
      } catch (err) {
        console.error(err);
        navigate("/notfound");
      }
    };

    if (mounted) {
      fetchMsg();
    }
  }, [id, mounted, currentUser, navigate]);

  const backTo = location.state?.from === "outbox" ? "/outbox" : "/inbox";

  return (
    <div className={styles.Container}>
      <button
        className={styles.BackButton}
        type="button"
        onClick={() => navigate(backTo)}
      >
        ← Back to {location.state?.from === "outbox" ? "Outbox" : "Inbox"}
      </button>
      {msg ? (
        <div className={styles.MessageBox}>
          <div className={styles.HeaderRow}>
            <span className={styles.Date}>📅 {formatDate(msg.created_at)}</span>
            <span className={styles.Subject}>📧 {msg.subject}</span>
          </div>
          <div className={styles.Body}>💬 {msg.message}</div>
          {location.state?.from === "outbox" ? (
            <p className={styles.To}>👤 To: {msg.recipient_username}</p>
          ) : (
            <p className={styles.From}>👤 From: {msg.sender_username}</p>
          )}
        </div>
      ) : (
        <p>Loading message...</p>
      )}
    </div>
  );
};

export default DirectMessageDetail;
