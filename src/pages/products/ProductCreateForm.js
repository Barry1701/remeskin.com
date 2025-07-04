import React, { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";
import Upload from "../../assets/upload.png";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2

function ProductCreateForm() {
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    image: "",
    category: "",
  });
  const { name, description, image, category } = productData;

  const imageInput = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/categories/");
        setCategories(data);
      } catch (err) {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load categories. Please try again later.",
        });
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (event) => {
    setProductData({
      ...productData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image); // Usuń poprzedni podgląd
      setProductData({
        ...productData,
        image: event.target.files[0], // Przechowuj faktyczny plik obrazu
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);

    // Dodaj obraz tylko, jeśli został wybrany
    if (imageInput.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    formData.append("category", category);

    try {
      const { data } = await axiosReq.post("/products/", formData);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product created successfully!",
      });
      navigate(`/products/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to create product. Please check the form and try again.",
        });
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container className={`${appStyles.Content} d-flex flex-column justify-content-center`}>
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={URL.createObjectURL(image)} rounded />
                  </figure>
                  <div>
                    <Form.Label className={`${btnStyles.Button} ${btnStyles.Blue} btn`} htmlFor="image-upload">
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label className="d-flex justify-content-center" htmlFor="image-upload">
                  <Asset src={Upload} message="Click or tap to upload an image" />
                </Form.Label>
              )}
              <Form.File id="image-upload" accept="image/*" onChange={handleChangeImage} ref={imageInput} style={{ display: "none" }} />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={name} onChange={handleChange} />
            </Form.Group>
            {errors?.name?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={6} name="description" value={description} onChange={handleChange} />
            </Form.Group>
            {errors?.description?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" name="category" value={category} onChange={handleChange}>
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {errors?.category?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-flex justify-content-between mt-3">
              <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
                Create
              </Button>
            </div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default ProductCreateForm;
