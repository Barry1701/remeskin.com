import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/Product.module.css"; // Import the styles

const Product = ({ id, owner, name, description, image, category_name, setProducts }) => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  const isOwner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/products/${id}/`);
      setProducts((prevProducts) => ({
        ...prevProducts,
        results: prevProducts.results.filter((product) => product.id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="mb-3">
      <Card.Img variant="top" src={image} alt={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        {category_name && (
          <Card.Text>
            <span className={styles.Category}>
              Category: {category_name.charAt(0).toUpperCase() + category_name.slice(1)}
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
  );
};

export default Product;
