const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");

router.get('/', shopController.getIndex);

// /products => GET
router.get('/products', shopController.getProducts);

// /products => GET
router.get('/products/delete');

// /products => GET
router.get('/products/:productId', shopController.getProduct);

// /cart => GET
router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);
// /orders => GET
router.get('/orders', shopController.getOrders);

// /checkout => GET
router.get('/checkout', shopController.getCheckout);

// /checkout => POST
router.post('/delete-cart-item', shopController.deleteCartItem);

module.exports = router;