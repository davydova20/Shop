const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then(([products]) => {
        res.render('shop/product-list', {
            prods: products,
            docTitle: 'All products',
            path: '/products',
        });
    }).catch(err => console.log(err));
}

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId).then(([product]) => {
        res.render('shop/product-detail', {
            product: product[0],
            docTitle: 'Product',
            path: '/products',
        });
    }).catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll().then(([products]) => {
        res.render('shop/index', {
            prods: products,
            docTitle: 'Home',
            path: '/',
        });
    }).catch(err => console.log(err));
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addToCart(prodId, product.price);
    })

    res.redirect('/cart');
}

exports.getCart = (req, res, next) => {
    Cart.getCart((cart) => {
        Product.fetchAll().then(([products]) => {
            const cartProducts = [];
            for (let product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({product, qty: cartProductData.qty})
                }
            }
            res.render('shop/cart', {
                docTitle: 'Cart',
                path: '/cart',
                products: cartProducts
            });
        }).catch(err => console.log(err))
    })
}

exports.deleteCartItem = (req, res) => {
    const productId = req.body.id;
    Product.findById(productId, (product) => {
        Cart.deleteProduct(productId, product.price)
    });
    res.redirect("/cart")
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        docTitle: 'Orders',
        path: '/orders',
    });
}


exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        docTitle: 'Checkout',
        path: '/checkout',
    });
}