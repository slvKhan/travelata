/* eslint-disable react/prop-types */
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductShopCart = ({
  product,
  handleincreaseProduct,
  handlereduceProduct,
  handleremoveProduct,
  increaseDisabled,
}) => {
  const {
    id,
    idProduct,
    productName,
    amountPrice,
    amount,
  } = product;

  return (
    <Card id={idProduct} className="mb-3">
      <Card.Body>
        <div className="content-wrap row">
          <span className="amount pr-0 col-1">
            <span>№</span>
            <span>{`${id}`}</span>
          </span>

          <span className="product-name col-3">
            {productName}
          </span>

          <div className="quantity-controll col-3">
            <Button
              variant="outline-secondary"
              className="col-3 ml-1 p-0 btn-sm"
              onClick={handlereduceProduct(idProduct)}
            >
              -
            </Button>
            <span>{` ${amount} `}</span>
            <span>шт</span>
            <Button
              variant="outline-success"
              className="col-3 ml-1 p-0 btn-sm"
              onClick={handleincreaseProduct(idProduct)}
              disabled={increaseDisabled}
            >
              +
            </Button>
          </div>
          <div className="amount-price p-0 ">
            <span>на сумму</span>
            <span>{` ${amountPrice} `}</span>
            <span>рублей</span>
          </div>
        </div>

        <div className="remove-wrap text-center mt-3">
          <Button
            variant="outline-danger"
            className="btn-sm w-50"
            onClick={handleremoveProduct(idProduct)}
          >
            удалить
          </Button>
        </div>

      </Card.Body>
    </Card>
  );
};

export default ProductShopCart;
