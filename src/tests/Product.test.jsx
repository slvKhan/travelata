/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Product from '../ShopCart/Product';

test('Product render_1', () => {
  const productName = 'Телефон';
  const id = 1;
  const price = 10;
  const amount = 1;

  const addProduct = () => null;
  const btnDisabled = false;
  const product = {
    id,
    productName,
    price,
    amount,
  };

  const component = renderer.create(<Product
    key={product.id}
    product={product}
    btnDisabled={btnDisabled}
    addProduct={addProduct}
  />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Product render_2', () => {
  const productName = 'text 2';
  const id = 5;
  const price = 123;
  const amount = 73;

  const addProduct = () => null;
  const btnDisabled = true;
  const product = {
    id,
    productName,
    price,
    amount,
  };

  const component = renderer.create(<Product
    key={product.id}
    product={product}
    btnDisabled={btnDisabled}
    addProduct={addProduct}
  />);

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
