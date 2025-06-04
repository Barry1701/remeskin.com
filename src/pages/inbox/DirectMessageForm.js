import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";

const DirectMessageForm = () => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosReq.post("/inbox/", { recipient, subject, body });
      setSuccess(true);
      setRecipient("");
      setSubject("");
      setBody("");
    } catch (err) {
      alert("Błąd wysyłki wiadomości");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Send a message</h3>
      <input
        type="text"
        placeholder="Recipient username"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        required
        name="recipient"
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
        name="subject"
      />
      <textarea
        placeholder="Your message"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        name="body"
      />
      <button type="submit">Send</button>
      {success && <p>Message sent!</p>}
    </form>
  );
};

export default DirectMessageForm;
