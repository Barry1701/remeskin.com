import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/DirectMessageDetail.module.css";

const DirectMessageDetail = () => {
  const { id } = useParams();
  const [msg, setMsg] = useState(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchMsg = async () => {
      try {
        const { data } = await axiosReq.get(`/messages/${id}/`);
        setMsg(data);
        // Opcjonalnie PATCH oznaczenie przeczytanej
        if (!data.read) {
          await axiosReq.patch(`/messages/${id}/`, { read: true });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMsg();
  }, [id]);

  if (!msg) return <div>Loading...</div>;

  const toLabel =
    msg.recipient_username === currentUser?.username
      ? "You"
      : msg.recipient_username;

  return (
    <div className={styles.Container}>
      <h3 className={styles.Subject}>Subject: {msg.subject}</h3>
      <div className={styles.Meta}>
        <b>From:</b> {msg.sender_username}
      </div>
      <div className={styles.Meta}>
        <b>To:</b> {toLabel}
      </div>
      <div className={styles.Content}>{msg.content}</div>
      <div className={styles.Meta}>
        <b>Date:</b> {msg.created_at}
      </div>
      <div className={styles.Meta}>
        <b>Status:</b> {msg.read ? "Read" : "Unread"}
      </div>
    </div>
  );
};

export default DirectMessageDetail;
