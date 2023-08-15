const fs = require("fs");
const path = require("path");
const rootDir = require("../helpers/path");

module.exports = class Cart {
    static addToCart(id, price) {
        // Fetch the previous cart
        fs.readFile(path.join(rootDir, "data", "cart.json"), (err, data) => {
            let cart = {products: [], totalPrice: 0};
            if (!err) {
                cart = JSON.parse(data)
            }
            //Analyze new product / increase quantity
            const existingProductIndex = cart.products.findIndex(product => product.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // Add new product / increase quantity
            if (existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty = existingProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +price;
            fs.writeFile(path.join(rootDir, "data", "cart.json"), JSON.stringify(cart), (err) => {
                console.log(err)
            })
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(path.join(rootDir, "data", "cart.json"), (err, data) => {
            if (err) {
                return;
            }
            const updatedCart = {...JSON.parse(data)};
            const deletedProduct = updatedCart.products.find(product => product.id === id);
            if (!deletedProduct) {
                return
            }
            updatedCart.products = updatedCart.products.filter(product => product.id !== deletedProduct.id);
            const productQty = deletedProduct.qty;
            updatedCart.totalPrice = updatedCart.totalPrice - deletedProduct.price * productQty;

            fs.writeFile(path.join(rootDir, "data", "cart.json"), JSON.stringify(updatedCart), (err, data) => {
                console.log(err);
            })
        })
    }

    static getCart(cb) {
        fs.readFile(path.join(rootDir, "data", "cart.json"), (err, data) => {
            if (err) {
                cb(null)
            } else {
                cb(JSON.parse(data));
            }

        })
    }
}