const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const rootDir = require("./helpers/path");

const app = express();
// const expressHbs = require('express-handlebars');

// app.engine('handlebars', expressHbs({
//     layoutsDir: 'views/layouts',
//     defaultLayout: 'main-layouts',
//     extname: 'handlebars'
// })); //hds isn't built in
// app.set('view engine', 'handlebars');
// app.set('view engine', 'pug'); //which engine use// pug is built-in
app.set('view engine', 'ejs'); //which engine use// ejs is built-in
app.set('views', 'views'); //where find templates

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, 'public')));

const adminData = require("./routes/admin");
app.use('/admin', adminData.routes);

const shopRoutes = require("./routes/shop");
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {docTitle: 'Error page'});
}); //for all not matching routes
app.listen(3000)

