import React from 'react';
import axios from 'axios';
import { findLastKey, omit } from 'lodash';
import Product from './Product';
import ProductInShopCart from './ProductInShopCart';

export default class ShopCart extends React.Component {
  constructor(props) {
    super(props);
    this.key = 'selectedProducts';
    this.state = {
      products: [],
      selectedProducts: {},
    };
  }

  componentDidMount() {
    this.fetchProducts();
    this.updateSelectedProductsByStore(this.key);
  }

  componentDidUpdate() {
    const { selectedProducts } = this.state;
    this.saveInStore(this.key, selectedProducts);
  }

  canAddProduct = (id) => {
    const { selectedProducts } = this.state;
    const selectedProductsArray = Object
      .entries(selectedProducts)
      .filter(([, product]) => product.idProduct === id);

    if (!selectedProductsArray.length) {
      return true;
    }

    const [[, selectedProduct]] = selectedProductsArray;
    return this.getProduct(id).maxPerPerson > selectedProduct.amount;
  }

  getProduct = (id) => {
    const { products } = this.state;
    const [result] = products.filter((product) => product.id === id);
    return result;
  }

  getSelectedProduct = (id) => {
    const { selectedProducts } = this.state;
    const [selectedProduct] = Object
      .entries(selectedProducts)
      .filter(([, product]) => product.idProduct === id);

    return selectedProduct;
  }

  isProductSelected = (id) => this.getSelectedProduct(id);

  isLastProduct = (id) => {
    const [, value] = this.getSelectedProduct(id);
    return value.amount === 1;
  }

  updateProduct = (type, id) => {
    const { selectedProducts } = this.state;
    const [key, value] = this.getSelectedProduct(id);
    const newSelectedProduct = {
      idProduct: value.idProduct,
      amount: type === 'increase' ? value.amount + 1 : value.amount - 1,
    };

    this.setState({ selectedProducts: { ...selectedProducts, [key]: { ...newSelectedProduct } } });
  }

  increaseProduct = (id) => {
    this.updateProduct('increase', id);
  }

  reduceProduct = (id) => {
    this.updateProduct('reduce', id);
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

  handleIncreaseProduct = (id) => (e) => {
    e.preventDefault();
    this.increaseProduct(id);
  }

  handleReduceProduct = (id) => (e) => {
    e.preventDefault();
    if (this.isLastProduct(id)) {
      this.removeProduct(id);
      return;
    }

    this.reduceProduct(id);
  }

  handleRemoveProduct = (id) => (e) => {
    e.preventDefault();
    this.removeProduct(id);
  }

  saveInStore = (key, selectedProducts) => {
    localStorage.setItem(key, JSON.stringify(selectedProducts));
  }

  updateSelectedProductsByStore = (key) => {
    const localSelectedProducts = localStorage.getItem(key);
    if (!localSelectedProducts) {
      return;
    }

    this.setState({ selectedProducts: JSON.parse(localSelectedProducts) });
  }

  productsCartHeader = (selectedProductMapped, titleStyle) => {
    const amountProducts = selectedProductMapped.reduce((totalProducts, product) => (
      totalProducts + product.amount
    ), 0);
    const amountPrice = selectedProductMapped.reduce((totalPrice, product) => (
      totalPrice + product.amountPrice
    ), 0);

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
      selectedProducts,
    } = this.state;

    if (!products.length) {
      return '...loading';
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
                btnDisabled={!this.canAddProduct(product.id)}
                addProduct={this.handleAddProduct}
              />
            ))}
          </div>

          <div className="products col-lg-6">
            {this.productsCartHeader(selectedProductMapped, titleStyle)}
            {selectedProductMapped.map((product) => (
              <ProductInShopCart
                key={product.idProduct}
                product={product}
                handleIncreaseProduct={this.handleIncreaseProduct}
                handleReduceProduct={this.handleReduceProduct}
                handleRemoveProduct={this.handleRemoveProduct}
                increaseDisabled={!this.canAddProduct(product.idProduct)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
