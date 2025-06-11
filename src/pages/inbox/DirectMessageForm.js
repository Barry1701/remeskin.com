import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/DirectMessageForm.module.css";

const DirectMessageForm = () => {
  const [receiver, setReceiver] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosReq.post("/messages/", { receiver, subject, content });
      setReceiver("");
      setSubject("");
      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.Form}>
      <h3 className={styles.Title}>Send a message</h3>
      <input
        type="text"
        placeholder="Recipient username"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        required
        name="receiver"
        className={styles.Field}
      />
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
        name="subject"
        className={styles.Field}
      />
      <textarea
        placeholder="Your message"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        name="content"
        className={`${styles.Field} ${styles.TextArea}`}
      />
      <button type="submit" className={styles.Button}>
        Send
      </button>
    </form>
  );
};

export default DirectMessageForm;
