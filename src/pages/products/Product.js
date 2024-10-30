import React from "react";
import Card from "react-bootstrap/Card";

function Product({ name, description, image }) {
  return (
    <Card className="mb-3">
      <Card.Img variant="top" src={image} alt={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
