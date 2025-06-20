import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/ProductPage.module.css";
import sharedStyles from "../../styles/Product.module.css"; // Import shared styles

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const [product, setProduct] = useState(null);
  const [errors, setErrors] = useState("");

  const isOwner = currentUser?.username === product?.owner;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosReq.get(`/products/${id}/`);
        setProduct(data);
      } catch (err) {
        console.log(err);
        setErrors("Product not found or an error occurred.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axiosReq.delete(`/products/${id}/`);
      navigate("/products");
    } catch (err) {
      console.log(err);
    }
  };

  if (errors) {
    return (
      <Container className={styles.Content}>
        <Alert variant="warning">{errors}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-3">
      {product ? (
        <Card className="mb-3">
          <Card.Img variant="top" src={product.image} alt={product.name} />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            {product.category_name && (
              <Card.Text>
                <span className={sharedStyles.Category}>
                  Category: {product.category_name.charAt(0).toUpperCase() + product.category_name.slice(1)}
                </span>
              </Card.Text>
            )}
            {isOwner && (
              <div className="d-flex justify-content-end">
                <Button
                  variant="warning"
                  onClick={() => navigate(`/products/${id}/edit`)}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="info">Loading...</Alert>
      )}
    </Container>
  );
}

export default ProductPage;
