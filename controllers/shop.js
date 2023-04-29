const Product = require("../models/product");
const Cart = require("../models/cart");
const { where } = require("sequelize");
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
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
  Product.findByPk(prodID)
    .then((product) => {
      console.log(product);
      res.render("shop/product-detail", {
        product: product,
        path: "",
        pageTitle: product.title,
      });
    })
    .catch((err) => console.log(err));
  // res.redirect("/");
};
// exports.getProduct = (req, res, next) => {
//   const prodId = req.params.productID;
//   Product.findAll({ where: { id: prodId } })
//     .then((product) => {
//       res.render("shop/product-detail", {
//         product: product[0],
//         path: "",
//         pageTitle: product.title,
//       });
//     })
//     .catch((err) => console.log(err));
// };

exports.postDeleteItem = (req, res, next) => {
  const prodID = req.body.productID;
  Product.findByPk(prodID)
    .then((product) => {
      product.destroy();
    })
    .then((res) => {
      console.log("DELETED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};
