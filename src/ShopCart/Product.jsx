/* eslint-disable react/prop-types */
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Product = ({ feats }) => {
  const {
    id, productName, price, amount,
  } = feats;

  return (
    <Card id={id}>
      <Card.Body className="row">
        <span className="amount col-3">
          <span>Осталось</span>
          <span> </span>
          <span>{amount}</span>
        </span>

        <span className="product-name col-3">
          {productName}
        </span>

        <span className="price col-3">
          <span>по</span>
          <span> </span>
          <span>{price}</span>
          <span> </span>
          <span>рублей</span>
        </span>

        <Button variant="primary" className="col-3">Добавить в корзину</Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
