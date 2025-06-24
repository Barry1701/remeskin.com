import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Mail, User, Calendar } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "../../components/ui/card";
import Badge from "../../components/ui/badge";

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
      className={`max-w-2xl mx-auto p-4 sm:p-6 rounded-xl ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } transition-all duration-500`}
    >
      <button
        onClick={() => navigate(backTarget)}
        className="text-sm text-blue-600 hover:underline mb-4"
      >
        ← Back to {backLabel}
      </button>
      <Card className="space-y-4">
        <CardHeader className="flex items-center gap-2 text-2xl font-bold">
          <Mail className="w-5 h-5 text-gray-600" />
          <span>{msg.subject}</span>
        </CardHeader>
        <CardContent className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-500" />
          <span className="font-semibold">From:</span>
          <span>{msg.sender_username}</span>
        </CardContent>
        {!isRecipient && (
          <CardContent className="flex items-center gap-2">
            <User className="w-4 h-4 text-gray-500" />
            <span className="font-semibold">To:</span>
            <span>{receiverLabel}</span>
          </CardContent>
        )}
        <CardContent className="whitespace-pre-line leading-relaxed">
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
