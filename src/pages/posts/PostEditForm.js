import React, { useEffect, useRef, useState } from "react";
import { Form, Row, Col, Container, Alert, Image } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { axiosReq } from "../../api/axiosDefaults";

function PostEditForm() {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    category: "general",
  });

  const { title, content, image, category } = postData;
  const imageInput = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        const { title, content, image, category, is_owner } = data;

        if (is_owner) {
          setPostData({ title, content, image, category });
        } else {
          Swal.fire("Error!", "You do not own this post.", "error");
          navigate("/");
        }
      } catch (err) {
        Swal.fire("Error!", "Failed to load post details.", "error");
      }
    };

    handleMount();
  }, [navigate, id]);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      Swal.fire("Success!", "Your post has been updated.", "success").then(() =>
        navigate(`/posts/${id}`)
      );
    } catch (err) {
      Swal.fire("Error!", "Failed to update the post. Please try again.", "error");
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosReq.delete(`/posts/${id}/`);
          Swal.fire("Deleted!", "Your post has been deleted.", "success").then(() => {
            if (location.state?.fromProfile) {
              navigate(`/profiles/${location.state.profileId}`);
            } else {
              navigate("/");
            }
          });
        } catch (err) {
          Swal.fire("Error!", "Failed to delete the post. Please try again.", "error");
        }
      }
    });
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" value={title} onChange={handleChange} />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" rows={6} name="content" value={content} onChange={handleChange} />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control as="select" name="category" value={category} onChange={handleChange}>
          <option value="general">General</option>
          <option value="eczema">Eczema</option>
          <option value="allergy">Allergy</option>
        </Form.Control>
      </Form.Group>
      {errors?.category?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <div className="d-flex justify-content-between mt-3">
        <button type="button" onClick={handleDelete} className={`${btnStyles.Button} ${btnStyles.Danger}`}>
          Delete
        </button>
        <button type="submit" className={`${btnStyles.Button} ${btnStyles.Bright}`}>
          Save Changes
        </button>
      </div>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}>
            <Form.Group className="text-center">
              <figure>
                <Image className={appStyles.Image} src={image} rounded />
              </figure>
              <div>
                <Form.Label className={`${btnStyles.Button} ${btnStyles.Blue} btn`} htmlFor="image-upload">
                  Change the image
                </Form.Label>
              </div>

              <Form.Control
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
                style={{ display: "none" }}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostEditForm;