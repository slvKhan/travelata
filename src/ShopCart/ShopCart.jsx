import React from 'react';
import axios from 'axios';
import { findLastKey, omit } from 'lodash';
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

  isProductSelected = (id) => {
    const { selectedProducts } = this.state;
    const [selectedProduct] = Object
      .entries(selectedProducts)
      .filter(([, product]) => product.idProduct === id);

    return !!selectedProduct;
  }

  isLastProduct = (id) => {
    const { selectedProducts } = this.state;
    const [[, value]] = Object
      .entries(selectedProducts)
      .filter(([, product]) => product.idProduct === id);

    return value.amount === 1;
  }

  increaseProduct = (id) => {
    const { selectedProducts } = this.state;
    const [[key, value]] = Object
      .entries(selectedProducts)
      .filter(([, product]) => product.idProduct === id);
    const newSelectedProduct = {
      idProduct: value.idProduct,
      amount: value.amount + 1,
    };

    this.setState({ selectedProducts: { ...selectedProducts, [key]: { ...newSelectedProduct } } });
  }

  reduceProduct = (id) => {
    const { selectedProducts } = this.state;
    const [[key, value]] = Object
      .entries(selectedProducts)
      .filter(([, product]) => product.idProduct === id);

    const newSelectedProduct = {
      idProduct: value.idProduct,
      amount: value.amount - 1,
    };

    this.setState({ selectedProducts: { ...selectedProducts, [key]: { ...newSelectedProduct } } });
  }

  removeProduct = (id) => {
    const { selectedProducts } = this.state;
    const [[key]] = Object
      .entries(selectedProducts)
      .filter(([, product]) => product.idProduct === id);
    const newSelectedProducts = omit(selectedProducts, [key]);

    this.setState({ selectedProducts: newSelectedProducts });
  }

  handleAddProduct = (id) => (e) => {
    e.preventDefault();

    if (this.isProductSelected(id)) {
      this.increaseProduct(id);
      return;
    }

    const { selectedProducts } = this.state;
    const arrayOfSelectedProducts = Object.entries(selectedProducts);
    const key = !arrayOfSelectedProducts.length
      ? 1
      : Number(findLastKey(selectedProducts)) + 1;
    const newSelectedProduct = { [key]: { idProduct: id, amount: 1 } };

    this.setState({
      selectedProducts: { ...selectedProducts, ...newSelectedProduct },
    });
  }

  handleincreaseProduct = (id) => (e) => {
    e.preventDefault();
    this.increaseProduct(id);
  }

  handlereduceProduct = (id) => (e) => {
    e.preventDefault();
    if (this.isLastProduct(id)) {
      this.removeProduct(id);
      return;
    }

    this.reduceProduct(id);
  }

  handleremoveProduct = (id) => (e) => {
    e.preventDefault();
    this.removeProduct(id);
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
      height: '50px',
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
                handleincreaseProduct={this.handleincreaseProduct}
                handlereduceProduct={this.handlereduceProduct}
                handleremoveProduct={this.handleremoveProduct}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
