import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Calendar, Mail, User, MessageCircle } from "lucide-react";
import styles from "../../styles/DirectMessageDetail.module.css";
import { Card, CardHeader, CardContent, CardFooter } from "../../components/ui/card";

const DirectMessageDetail = () => {
  const { id } = useParams();
  const [msg, setMsg] = useState({});
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  const fromView = location.state?.from === "outbox" ? "Outbox" : "Inbox";

  useEffect(() => {
    const fetchMsg = async () => {
      try {
        const { data } = await axiosReq.get(`/messages/${id}/`);
        setMsg(data);
        // mark read only if I'm the recipient
        if (data.recipient_username === currentUser?.username) {
          await axiosReq.patch(`/messages/${id}/`, { read: true });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMsg();
  }, [id, currentUser]);

  return (
    <div className={styles.Container}>
      <button
        className={styles.BackButton}
        onClick={() => navigate(`/${fromView.toLowerCase()}`)}
      >
        ← Back to {fromView}
      </button>

      <Card>
        <CardHeader className={styles.Header}>
          <div className={styles.HeaderGroup}>
            <Calendar className={styles.Icon} />
            <span className={styles.Date}>
              {new Date(msg.created_at).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <div className={styles.HeaderGroup}>
            <Mail className={styles.Icon} />
            <h2 className={styles.Subject}>{msg.subject}</h2>
          </div>
        </CardHeader>

        <CardContent className={styles.Content}>
          <MessageCircle className={styles.Icon} />
          <p>{msg.content}</p>
        </CardContent>

        <CardFooter className={styles.Footer}>
          <div className={styles.FooterGroup}>
            <User className={styles.Icon} />
            <span>From: {msg.sender_username}</span>
          </div>
          <div className={styles.FooterGroup}>
            <User className={styles.Icon} />
            <span>To: {msg.recipient_username}</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DirectMessageDetail;
