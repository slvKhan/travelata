import React from 'react';
import axios from 'axios';
import Product from './Product';

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
    const titleStyle = {
      height: '5vh',
    };

    return (
      <div className="container">
        <h1 className="mb-4 text-left">Корзина</h1>
        <div className="row">

          <div className="products col-6">
            <h2 className="mb-5 text-left" style={titleStyle}>
              Имеющиеся категории товаров
              <span> </span>
              <span>{products.length}</span>
            </h2>
            { products.map((el) => <Product key={el.id} feats={el} />)}
          </div>

          <div className="products col-6">
            <h2 className="mb-5 text-left" style={titleStyle}>
              В корзине 6 товаров на сумму 310000 рублей
            </h2>
            { products.map((el) => <Product key={el.id} feats={el} />)}
          </div>

        </div>
      </div>
    );
  }
}
