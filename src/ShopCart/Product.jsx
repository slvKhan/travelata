/* eslint-disable react/prop-types */
import React from 'react';
import cn from 'classnames';
import { Card, Button } from 'react-bootstrap';

const Product = ({ product, addProduct, btnDisabled }) => {
  const {
    id,
    productName,
    price,
    amount,
  } = product;

  const btnClass = cn('col-3', {
    disabled: btnDisabled,
  });

  return (
    <Card id={id} className="mb-2">
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

        <Button
          variant="primary"
          className={btnClass}
          onClick={addProduct(id)}
          disabled={btnDisabled}
        >
          Добавить в корзину
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
