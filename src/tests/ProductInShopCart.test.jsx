/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import ProductShopCart from '../ShopCart/ProductInShopCart';

test('ProductShopCart render_1', () => {
  const productName = 'Телефон';
  const id = 1;
  const idProduct = 4;
  const amountPrice = 10;
  const amount = 1;

  const handleRemoveProduct = () => null;
  const handleIncreaseProduct = () => null;
  const handleReduceProduct = () => null;
  const increaseDisabled = false;

  const product = {
    id,
    idProduct,
    productName,
    amountPrice,
    amount,
  };

  const component = renderer.create(<ProductShopCart
    key={product.idProduct}
    product={product}
    handleIncreaseProduct={handleIncreaseProduct}
    handleReduceProduct={handleReduceProduct}
    handleRemoveProduct={handleRemoveProduct}
    increaseDisabled={increaseDisabled}
  />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('ProductShopCart render_2', () => {
  const productName = 'text 2';
  const id = 51;
  const price = 2;
  const amount = 6;

  const handleRemoveProduct = () => null;
  const handleIncreaseProduct = () => null;
  const handleReduceProduct = () => null;
  const increaseDisabled = true;

  const product = {
    id,
    productName,
    price,
    amount,
  };

  const component = renderer.create(<ProductShopCart
    key={product.idProduct}
    product={product}
    handleIncreaseProduct={handleIncreaseProduct}
    handleReduceProduct={handleReduceProduct}
    handleRemoveProduct={handleRemoveProduct}
    increaseDisabled={increaseDisabled}
  />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
