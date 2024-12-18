import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/CommentCreateEditForm.module.css";
import Swal from "sweetalert2";

function CommentEditForm(props) {
  const { id, content, category, setShowEditForm, setComments } = props;

  const [formContent, setFormContent] = useState(content);
  const [formCategory, setFormCategory] = useState(category);

  const handleContentChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setFormCategory(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
        category: formCategory,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                category: formCategory,
                updated_at: "now",
              }
            : comment;
        }),
      }));
      setShowEditForm(false);
      Swal.fire("Success!", "Your comment has been updated.", "success");
    } catch (err) {
      console.log(err);
      Swal.fire("Error!", "Failed to update the comment. Please try again.", "error");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
        <Form.Control
          className={styles.Form}
          as="textarea"
          value={formContent}
          onChange={handleContentChange}
          rows={2}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          as="select"
          value={formCategory}
          onChange={handleCategoryChange}
          className="mt-2"
        >
          <option value="general">General</option>
          <option value="question">Question</option>
          <option value="tip">Tip</option>
        </Form.Control>
      </Form.Group>
      <div className="text-right">
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        <button
          className={styles.Button}
          disabled={!formContent.trim()}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;
