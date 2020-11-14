import React from 'react';
import axios from 'axios';

export default class ShopCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  async fetchProducts() {
    const { data } = await axios.get('/resource/products.json');
    this.setState({ products: [...data.products] });
  }

  render() {
    const { products } = this.state;
    return (
      <h1>
        { products.map((el) => <li key={el.id}>{el.productName}</li>)}
      </h1>
    );
  }
}
