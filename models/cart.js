const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);
module.exports = class Cart {
  // constructor() {
  //   this.product = [];
  //   this.totalPrice = 0;
  // }
  static addProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      let updateProduct;
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      let existingProduct = cart.products[existingProductIndex];
      if (existingProduct) {
        updateProduct = { ...existingProduct };
        updateProduct.quantity = updateProduct.quantity + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updateProduct;
      } else {
        updateProduct = { id: id, quantity: 1 };

        cart.products = [...cart.products, updateProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log("Errol writeFile Cart", err);
      });
    });
  }
  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find((res) => res.id === id);
      const productQty = product.quantity;
      updatedCart.products = updatedCart.products.filter(
        (res) => res.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productQty * productPrice;
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log("Errol writeFile Cart", err);
      });
    });
  }
  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        return cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
