/* eslint-disable react/prop-types */
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Product = ({ product, addProduct }) => {
  const {
    id,
    productName,
    price,
    amount,
  } = product;

  return (
    <Card id={id}>
      <Card.Body className="row">
        <span className="amount col-3">
          <span>Осталось</span>
          <span>{` ${amount} `}</span>
        </span>

        <span className="product-name col-3">
          {productName}
        </span>

        <span className="price col-3">
          <span>по</span>
          <span>{` ${price} `}</span>
          <span>рублей</span>
        </span>

        <Button variant="primary" className="col-3" onClick={addProduct(id)}>Добавить в корзину</Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
