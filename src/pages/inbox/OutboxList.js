import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Link } from "react-router-dom";

const OutboxList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOutbox = async () => {
      try {
        const { data } = await axiosReq.get("/outbox/");
        setMessages(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchOutbox();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Outbox</h2>
      {messages.length === 0 && <div>No sent messages.</div>}
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <b>To:</b> {msg.recipient_username} <b>Subject:</b> {msg.subject}{" "}
            <Link to={`/messages/${msg.id}`}>View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OutboxList;
