import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Mail, User, Eye } from "lucide-react";
import styles from "../../styles/InboxList.module.css";
import { Card, CardHeader, CardContent, CardFooter } from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import Button from "../../components/ui/button";

const InboxList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInbox = async () => {
      try {
        const { data } = await axiosReq.get("/inbox/");
        // Some endpoints return an object with a `results` array while others
        // return the array directly. Normalize the value so `messages` is
        // always an array.
        const inboxMessages = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
          ? data.results
          : [];
        setMessages(inboxMessages);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchInbox();
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
      <h2 className={styles.Title}>Inbox</h2>
      {messageList.length === 0 && <div>No messages.</div>}
      <div className="flex flex-col gap-4">
        {messageList.map((msg) => (
          <Card
            key={msg.id}
            className={`${!msg.read ? "bg-gray-100" : ""}`}
          >
            <CardHeader>
              <User className="w-4 h-4" />
              <span>From: {msg.sender_username}</span>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>Subject: {msg.subject}</span>
            </CardContent>
            <CardFooter>
              <Badge variant={msg.read ? "outline" : "secondary"}>
                {msg.read ? "Read" : "Unread"}
              </Badge>
              <Button to={`/messages/${msg.id}`}>
                <Eye className="w-4 h-4" />
                View
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InboxList;
