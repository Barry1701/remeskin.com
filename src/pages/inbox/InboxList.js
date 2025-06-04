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
        setMessages(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchInbox();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Inbox</h2>
      {messages.length === 0 && <div>No messages.</div>}
      <ul>
        {messages.map((msg) => (
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
