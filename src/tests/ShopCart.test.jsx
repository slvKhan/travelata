/* eslint-disable no-undef */
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import ShopCart from '../ShopCart/ShopCart';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// test('renders before fetch products', () => {
//   render(<ShopCart />);
//   const linkElement = screen.getByText(/...loading/i);
//   expect(linkElement).toBeInTheDocument();
// });

it('renders after fetch products', async () => {
  const fakeProducts = {
    products: [
      {
        id: 1,
        productName: 'Телефон',
        price: 50000,
        amount: 2,
        maxPerPerson: 2,
      },
    ],
  };

  jest.spyOn(axios, 'get').mockImplementation((url) => {
    if (url === '/resource/products.json') {
      return Promise.resolve({ data: fakeProducts });
    }
    return {};
  });

  await act(async () => {
    render(<ShopCart />, container);
  });

  expect(container.getElementsByClassName('amount').length).toBe(1);

  axios.get.mockRestore();
});
