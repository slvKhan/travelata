import React from 'react';
import axios from 'axios';
import Product from './Product';

export default class ShopCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedProducts: {
        1: {
          id_product: 2,
          amount: 1,
        },
      },
      amountPrice: 31000,
      amountProducts: 4,
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  handleAddProduct = (id) => (e) => {
    e.preventDefault();
    const { products } = this.state;
    const selectedProduct = products.filter((product) => product.id === id);
    alert(JSON.stringify(selectedProduct));
  }

  productsCartHeader = (amountPrice, amountProducts, titleStyle) => {
    const ProductCartHeaderContent = (
      <span>
        В кознине
        <span>{` ${amountProducts} `}</span>
        товаров на сумму
        <span>{` ${amountPrice} `}</span>
        рублей
      </span>
    );

    return (
      <h2 className="mb-5 text-left" style={titleStyle}>
        {amountProducts
          ? (ProductCartHeaderContent)
          : <div className="text-center">Корзина пуста</div>}
      </h2>
    );
  }

  async fetchProducts() {
    const { data } = await axios.get('/resource/products.json');
    this.setState({ products: [...data.products] });
  }

  render() {
    const { products, amountPrice, amountProducts } = this.state;
    const titleStyle = {
      height: '5vh',
    };

    const CategoryHeader = (
      <h2 className="mb-5 text-left" style={titleStyle}>
        Имеющиеся категории товаров
        <span>{` ${products.length} `}</span>
      </h2>
    );

    return (
      <div className="container">
        <h1 className="mb-4 text-left">Корзина</h1>
        <div className="row">

          <div className="products col-lg-6">
            {CategoryHeader}
            {products.map((el) => (
              <Product key={el.id} feats={el} addProduct={this.handleAddProduct} />
            ))}
          </div>

          <div className="products col-lg-6">
            {this.productsCartHeader(amountPrice, amountProducts, titleStyle)}

          </div>
        </div>
      </div>
    );
  }
}
