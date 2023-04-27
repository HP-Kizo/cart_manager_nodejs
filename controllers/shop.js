const Product = require("../models/product");
const Cart = require("../models/cart");
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];

      for (let product of products) {
        const cartProductData = cart.products.find(
          (res) => res.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({
            productData: product,
            quantity: cartProductData.quantity,
          });
        }
      }
      console.log(cartProducts);
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodID = req.body.productID;
  Product.findByID(prodID, (product) => {
    Cart.addProduct(prodID, product.price);
  });
  console.log(prodID);
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.getProduct = (req, res, next) => {
  const prodID = req.params.productID;
  console.log(prodID);
  Product.findByID(prodID, (product) => {
    res.render("shop/product-detail", {
      product: product,
      path: "",
      pageTitle: product.title,
    });
  });
  // res.redirect("/");
};

exports.postDeleteItem = (req, res, next) => {
  const prodID = req.body.productID;
  Product.findByID(prodID, (product) => {
    console.log("Test", product);
    Cart.deleteProduct(prodID, product.price);
    res.redirect("/cart");
  });
};
