import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import axios from "axios";
import Swal from "sweetalert2";

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
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load the product. Redirecting to the main page.",
        });
        history.push("/");
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/categories/");
        setCategories(data.results || data);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load categories. Please try again later.",
        });
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
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product updated successfully!",
      });
      history.push(`/products/${id}`);
    } catch (err) {
      console.error(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update the product. Please check the form.",
        });
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
          await axiosReq.delete(`/products/${id}/`);
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Your product has been deleted.",
          });
          history.push("/products");
        } catch (err) {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete the product. Please try again later.",
          });
        }
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container className="p-4 border rounded">
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

        <Form.Group className="text-center">
          {image && (
            <figure className="d-flex justify-content-center">
              <Image src={image} rounded className="w-50" />
            </figure>
          )}
          <label htmlFor="image-upload" className="btn btn-info mt-3">
            Change Image
          </label>
          <Form.File
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

        <div className="d-flex justify-content-between mt-3">
          <button
            type="button"
            onClick={handleDelete}
            className="btn btn-danger"
          >
            Delete
          </button>
          <button
            type="submit"
            className="btn btn-warning"
          >
            Save Changes
          </button>
        </div>
      </Container>
    </Form>
  );
}

export default ProductEditForm;
