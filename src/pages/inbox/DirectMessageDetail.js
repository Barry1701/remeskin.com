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

  return (
    <div className={styles.Container}>
      {msg ? (
        <div className={styles.MessageBox}>
          <h2 className={styles.Subject}>📝 {msg.subject}</h2>
          <p className={styles.From}>👤 From: {msg.sender_username}</p>
          <p className={styles.To}>📨 To: {msg.recipient_username}</p>
          <p className={styles.Date}>📅 {msg.created_at?.slice(0, 10)}</p>
          <div className={styles.Body}>💬 {msg.message}</div>
        </div>
      ) : (
        <p>Loading message...</p>
      )}
    </div>
  );
};

export default DirectMessageDetail;
