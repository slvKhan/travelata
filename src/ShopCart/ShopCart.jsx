import React from 'react';
import axios from 'axios';
import Product from './Product';
import ProductInShopCart from './ProductInShopCart';

export default class ShopCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      selectedProducts: {
        1: {
          idProduct: 2,
          amount: 1,
        },
        2: {
          idProduct: 5,
          amount: 3,
        },
      },
      amountPrice: 31000,
      amountProducts: 4,
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  getProduct = (id) => {
    const { products } = this.state;
    return products.filter((product) => product.id === id);
  }

  handleAddProduct = (id) => (e) => {
    e.preventDefault();
    const selectedProduct = this.getProduct(id);
    alert(JSON.stringify(selectedProduct));
  }

  increaseProduct = (id) => (e) => {
    e.preventDefault();
    const selectedProduct = this.getProduct(id);
    alert(JSON.stringify(selectedProduct));
  }

  reduceProduct = (id) => (e) => {
    e.preventDefault();
    const selectedProduct = this.getProduct(id);
    alert(JSON.stringify(selectedProduct));
  }

  removeProduct = (id) => (e) => {
    e.preventDefault();
    const selectedProduct = this.getProduct(id);
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
    const {
      products,
      amountPrice,
      amountProducts,
      selectedProducts,
    } = this.state;

    if (!products.length) {
      return null;
    }

    const selectedProductMapped = Object.entries(selectedProducts).map(([key, value]) => {
      const [product] = products.filter((el) => el.id === value.idProduct);

      return {
        id: Number(key),
        idProduct: product.id,
        productName: product.productName,
        amountPrice: value.amount * product.price,
        amount: value.amount,
      };
    });

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
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                addProduct={this.handleAddProduct}
              />
            ))}
          </div>

          <div className="products col-lg-6">
            {this.productsCartHeader(amountPrice, amountProducts, titleStyle)}
            {selectedProductMapped.map((product) => (
              <ProductInShopCart
                key={product.idProduct}
                product={product}
                increaseProduct={this.increaseProduct}
                reduceProduct={this.reduceProduct}
                removeProduct={this.reduceProduct}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
