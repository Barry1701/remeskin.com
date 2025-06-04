import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";

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
    <div>
      <h2>Inbox</h2>
      {messageList.length === 0 && <div>No messages.</div>}
      <ul>
        {messageList.map((msg) => (
          <li key={msg.id}>
            <b>From:</b> {msg.sender_username} <b>Subject:</b> {msg.subject}{" "}
            <Link to={`/messages/${msg.id}`}>View</Link>
            {msg.read ? " (Read)" : " (Unread)"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InboxList;
