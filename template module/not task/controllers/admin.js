const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
        docTitle: 'Add product',
        path: '/admin/add-product',
        editing: false
    })
}

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll().then(([products]) => {
        res.render('admin/products', {
            prods: products,
            docTitle: 'Products',
            path: '/admin/products',
        });
    }).catch(err => console.log(err));

}

exports.deleteAdminProduct = (req, res, next) => {
    Product.deleteById(req.body.id);
    res.redirect('/admin/products');
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(null, req.body.title, req.body.imageUrl, req.body.description, req.body.price);
    product.save().then(() => {
        res.redirect('/');
    }).catch(err => {
            console.log(err)
        }
    )
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const prodId = req.params.productId;
    Product.findById(prodId, (product) => {
        if (!product) {
            return res.redirect("/");
        }
        res.render("admin/edit-product", {
            product: product,
            docTitle: 'Edit product',
            path: '/admin/edit-product',
            editing: editMode
        })
    })
};

exports.postEditProduct = (req, res, next) => {
    const product = new Product(req.body.id, req.body.title, req.body.imageUrl, req.body.description, req.body.price);
    product.save().then(() => {
        res.redirect('/admin/products');
    }).catch(err => {
            console.log(err)
        }
    )
};

exports.postDeleteProduct = (req, res) => {
    const prodId = req.body.id;
    Product.deleteById(prodId);
    res.redirect("/admin/products")
};