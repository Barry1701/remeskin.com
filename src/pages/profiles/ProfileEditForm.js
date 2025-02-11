import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import Swal from "sweetalert2";

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const history = useHistory();

  // Reference for the image input field
  const imageFile = useRef();

  // Profile state includes 'allergy_type' with a default of "none"
  const [profileData, setProfileData] = useState({
    name: "",
    content: "",
    image: "",
    allergy_type: "none",
  });
  const { name, content, image, allergy_type } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Only allow the owner to edit this profile
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, content, image, allergy_type } = data;
          setProfileData({ name, content, image, allergy_type });
        } catch (err) {
          console.log(err);
          Swal.fire("Error!", "Failed to load profile details.", "error");
          history.push("/");
        }
      } else {
        Swal.fire("Error!", "Unauthorized access to this profile.", "error");
        history.push("/");
      }
    };
    handleMount();
  }, [currentUser, history, id]);

  // Update local state on form changes
  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission to update the profile
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);
    formData.append("allergy_type", allergy_type);

    // If a new image is selected, append it to formData
    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile.current.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);

      // Update currentUser if the profile image changed
      setCurrentUser((prevUser) => ({
        ...prevUser,
        profile_image: data.image,
      }));

      Swal.fire("Success!", "Your profile has been updated.", "success").then(
        () => {
          history.goBack();
        }
      );
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
      Swal.fire("Error!", "Failed to update the profile.", "error");
    }
  };

  // All form fields except the image
  const textFields = (
    <>
      {/* Name field */}
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" value={name} onChange={handleChange} />
      </Form.Group>
      {errors?.name?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Bio / content field */}
      <Form.Group>
        <Form.Label>Bio</Form.Label>
        <Form.Control as="textarea" rows={7} name="content" value={content} onChange={handleChange} />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Allergy Type field */}
      <Form.Group>
        <Form.Label>Allergy Type</Form.Label>
        <Form.Control as="select" name="allergy_type" value={allergy_type} onChange={handleChange}>
          <option value="none">No Specific Allergy</option>
          <option value="milk">Milk Allergy</option>
          <option value="nuts">Nut Allergy</option>
          <option value="wheat">Wheat Allergy</option>
          <option value="eggs">Egg Allergy</option>
          <option value="shellfish">Shellfish Allergy</option>
        </Form.Control>
      </Form.Group>
      {errors?.allergy_type?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      {/* Buttons for cancel and save */}
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} onClick={() => history.goBack()}>
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        save
      </Button>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        {/* Left column: image preview */}
        <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
          <Container className={appStyles.Content}>
            <Form.Group>
              {image && (
                <figure>
                  <Image src={image} fluid />
                </figure>
              )}
              {errors?.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label className={`${btnStyles.Button} ${btnStyles.Blue} btn my-auto`} htmlFor="image-upload">
                  Change the image
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileEditForm;
