import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/DirectMessageDetail.module.css";
import { Mail, User, Calendar } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "../../components/ui/card";
import Badge from "../../components/ui/badge";

const DirectMessageDetail = () => {
  const { id } = useParams();
  const [msg, setMsg] = useState(null);
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

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
    <div className={styles.Container}>
      <button
        onClick={() => navigate(backTarget)}
        className="text-sm text-blue-600 hover:underline mb-4"
      >
        ← Back to {backLabel}
      </button>
      <Card className="space-y-2">
        <CardHeader className="text-lg">
          <Mail className="w-4 h-4" />
          <span>{msg.subject}</span>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span className="font-semibold">From:</span>
          <span>{msg.sender_username}</span>
        </CardContent>
        {!isRecipient && (
          <CardContent className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="font-semibold">To:</span>
            <span>{receiverLabel}</span>
          </CardContent>
        )}
        <CardContent className="whitespace-pre-line">
          {msg.content}
        </CardContent>
        <CardContent className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </CardContent>
        <CardFooter className="justify-end">
          {(() => {
            const isRead =
              msg.read === true ||
              msg.read === "true" ||
              msg.read === 1 ||
              msg.read === "1";
            return (
              <Badge variant={isRead ? "outline" : "secondary"}>
                {isRead ? "Read" : "Unread"}
              </Badge>
            );
          })()}
        </CardFooter>
      </Card>
    </div>
  );
};

export default DirectMessageDetail;
