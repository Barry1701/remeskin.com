import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/DirectMessageForm.module.css";
import Swal from "sweetalert2";

const DirectMessageForm = () => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosReq.post("/messages/", { recipient, subject, content });
      setRecipient("");
      setSubject("");
      setContent("");

      Swal.fire({
        icon: "success",
        title: "Message Sent",
        text: "Your message was successfully delivered.",
        confirmButtonColor: "#3085d6",
      });
    } catch (err) {
      if (
        err.response?.status === 400 &&
        err.response.data?.recipient?.[0] === "User does not exist."
      ) {
        Swal.fire({
          icon: "error",
          title: "User Not Found",
          text: "The recipient username does not exist. Please check and try again.",
          confirmButtonColor: "#d33",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong while sending the message.",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.Form}>
      <h3 className={styles.Title}>Send a message</h3>
      <input
        type="text"
        placeholder="Recipient username"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        required
        name="recipient"
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
