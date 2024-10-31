import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import axios from "axios";

function ProductEditForm() {
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
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosReq.get(`/products/${id}/`);
        setProductData(data);
      } catch (err) {
        console.log(err);
        history.push("/");
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/categories/");
        setCategories(data.results);
      } catch (err) {
        console.log(err);
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
          <Form.Control as="textarea" rows={3} name="description" value={description} onChange={handleChange} />
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

        <Form.Group>
          <Image src={image} rounded />
          <Form.Label htmlFor="image-upload">Change Image</Form.Label>
          <Form.File id="image-upload" accept="image/*" onChange={handleChangeImage} ref={imageInput} />
        </Form.Group>
        {errors?.image?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Button type="submit">Save Changes</Button>
      </Container>
    </Form>
  );
}

export default ProductEditForm;
