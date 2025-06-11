import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Mail, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "../../styles/OutboxList.module.css";
import { Card, CardHeader, CardContent, CardFooter } from "../../components/ui/card";
import Badge from "../../components/ui/badge";

const OutboxList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOutbox = async () => {
      try {
        const { data } = await axiosReq.get("/outbox/");
        // Some endpoints return an object with a `results` array while others
        // return the array directly. Normalize the value so `messages` is
        // always an array.
        const outboxMessages = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
          ? data.results
          : [];
        // Mark outbox messages as read by default so they aren't shown as unread
        const markedRead = outboxMessages.map((msg) => ({ ...msg, read: true }));
        setMessages(markedRead);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchOutbox();
  }, []);

  if (loading) return <div>Loading...</div>;

  // Guard against unexpected data shapes to prevent runtime errors
  const messageList = Array.isArray(messages)
    ? messages
    : Array.isArray(messages?.results)
    ? messages.results
    : [];

  return (
    <div className={styles.Container}>
      <h2 className={styles.Title}>Outbox</h2>
      {messageList.length === 0 && <div>No sent messages.</div>}
      <div className="flex flex-col gap-4">
        {messageList.map((msg) => (
          <Card key={msg.id}>
            <CardHeader>
              <User className="w-4 h-4" />
              <span className="font-semibold">To:</span>
              <span>
                {msg.receiver_username ||
                  msg.recipient_username ||
                  msg.receiver ||
                  msg.recipient}
              </span>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="font-semibold">Subject:</span>
              <span>{msg.subject}</span>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <Badge variant={msg.read ? "outline" : "secondary"}>
                {msg.read ? "Read" : "Unread"}
              </Badge>
              <Link
                to={`/messages/${msg.id}/`}
                className="inline-flex items-center gap-1 bg-[#2142b2] text-white px-4 py-2 rounded hover:bg-[#242a3d] transition"
              >
                View
                <ArrowRight className="w-4 h-4" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OutboxList;
