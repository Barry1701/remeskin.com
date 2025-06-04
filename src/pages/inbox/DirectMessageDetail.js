import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom";

const DirectMessageDetail = () => {
  const { id } = useParams();
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const fetchMsg = async () => {
      try {
        const { data } = await axiosReq.get(`/messages/${id}/`);
        setMsg(data);
        // Opcjonalnie PATCH oznaczenie przeczytanej
        if (!data.read) {
          await axiosReq.patch(`/messages/${id}/`, { read: true });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMsg();
  }, [id]);

  if (!msg) return <div>Loading...</div>;

  return (
    <div>
      <h3>Subject: {msg.subject}</h3>
      <p>
        <b>From:</b> {msg.sender_username} <b>To:</b> {msg.recipient_username}
      </p>
      <p>{msg.body}</p>
      <p>
        <b>Date:</b> {msg.created_at} | <b>Status:</b> {msg.read ? "Read" : "Unread"}
      </p>
    </div>
  );
};

export default DirectMessageDetail;
