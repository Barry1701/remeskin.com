import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Calendar, Mail, MessageCircle } from "lucide-react";
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg";
import styles from "./DirectMessageDetail.module.css";
import { Card, CardHeader, CardContent, CardFooter } from "../../components/ui/card";

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
const DirectMessageDetail = () => {
  const { id } = useParams();
  const [msg, setMsg] = useState({});
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const fromOutbox = currentUser?.username === msg.sender_username;
  const fromView = fromOutbox ? "Outbox" : "Inbox";

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
          <Calendar className={styles.Icon} />
          <span className={styles.Date}>
            {formatDate(msg.created_at || msg.timestamp)}
          </span>
          <Mail className={styles.Icon} />
          <h2 className={styles.Subject}>{msg.subject}</h2>
        </CardHeader>

        <CardContent className={styles.Content}>
          <MessageCircle className={styles.Icon} />
          <p>{msg.content}</p>
        </CardContent>

        <CardFooter className={styles.Footer}>
          <UserIcon className={styles.Icon} />
          {fromOutbox ? (
            <span>To: {msg.recipient_username}</span>
          ) : (
            <span>From: {msg.sender_username}</span>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default DirectMessageDetail;
