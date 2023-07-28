const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("add-product", {
        docTitle: 'Add product',
        path: '/admin/add-product',
        formCSS: true,
        activeAddProduct: true,
        productCSS: true
    })
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop', {
            prods: products,
            docTitle: 'Shop',
            path: '/shop',
            activeShop: true,
            productCss: true
        });
    });

}