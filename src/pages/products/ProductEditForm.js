import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import axios from "axios";
import btnStyles from "../../styles/Button.module.css"; // Import your Button styles

function ProductEditForm() {
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]); // Default to an empty array
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    image: "",
    category: "",
  });
  const { name, description, image, category } = productData;
  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosReq.get(`/products/${id}/`);
        setProductData(data);
      } catch (err) {
        console.log(err);
        history.push("/"); // Redirect on failure
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/categories/");
        setCategories(data.results || data); // Ensure compatibility with both formats
      } catch (err) {
        console.log(err);
        setCategories([]); // Ensure categories is always an array
      }
    };

    fetchProduct();
    fetchCategories();
  }, [history, id]);

  const handleChange = (event) => {
    setProductData({
      ...productData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setProductData({
        ...productData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);

    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    try {
      await axiosReq.put(`/products/${id}/`, formData);
      history.push(`/products/${id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        {/* Name Field */}
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.name?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        {/* Description Field */}
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={description}
            onChange={handleChange}
          />
        </Form.Group>
        {errors?.description?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        {/* Category Field */}
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={category}
            onChange={handleChange}
          >
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

        {/* Image Upload */}
        <Form.Group>
          {image && <Image src={image} rounded />}
          <div className="mt-3">
            <label
              htmlFor="image-upload"
              className={`${btnStyles.Button} ${btnStyles.Blue}`} // Same style as Cancel/Create
            >
              Change Image
            </label>
            <Form.File
              id="image-upload"
              accept="image/*"
              onChange={handleChangeImage}
              ref={imageInput}
              style={{ display: "none" }}
            />
          </div>
        </Form.Group>
        {errors?.image?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        {/* Buttons */}
        <div className="d-flex justify-content-between mt-3">
          <button
            type="button"
            onClick={() => history.goBack()}
            className={`${btnStyles.Button} ${btnStyles.Blue}`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`${btnStyles.Button} ${btnStyles.Blue}`}
          >
            Save Changes
          </button>
        </div>
      </Container>
    </Form>
  );
}

export default ProductEditForm;
