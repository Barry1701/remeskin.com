import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  Calendar,
  Mail,
  MessageCircle,
  User as UserIcon,
} from "lucide-react";
import styles from "../../styles/DirectMessageDetail.module.css";
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
  const fromOutbox = currentUser?.username === msg.sender_username;

  useEffect(() => {
    const fetchMsg = async () => {
      try {
        const { data } = await axiosReq.get(`/messages/${id}/`);
        setMsg(data);
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
      <Card>
        <CardHeader className={styles.Header}>
          <Calendar className={styles.Icon} />
          <span className={styles.Date}>
            {formatDate(msg.created_at || msg.timestamp)}
          </span>

          <Mail className={styles.Icon} />
          <h2 className={styles.Subject}>{msg.subject}</h2>

          {fromOutbox && msg.read === false && (
            <span className={styles.UnreadDot} />
          )}
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
