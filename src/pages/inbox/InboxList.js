import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Mail, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "../../styles/InboxList.module.css";
import { Card, CardHeader, CardContent, CardFooter } from "../../components/ui/card";
import Badge from "../../components/ui/badge";

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
              <span className="font-semibold">From:</span>
              <span>{msg.sender_username}</span>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="font-semibold">Subject:</span>
              <span>{msg.subject}</span>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
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
              <Link
                to={`/messages/${msg.id}`}
                state={{ from: "inbox" }}
                className="inline-flex items-center gap-2 bg-[#2142b2] text-white font-semibold px-4 py-2 rounded-xl shadow hover:bg-[#1b36a0] transition"
              >
                Read
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InboxList;
