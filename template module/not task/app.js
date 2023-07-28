const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const rootDir = require("./helpers/path");
const errorController = require("./controllers/404");

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

const adminRoutes = require("./routes/admin");
app.use('/admin', adminRoutes);

const shopRoutes = require("./routes/shop");
app.use(shopRoutes);

app.use(errorController.renderErrorPage); //for all not matching routes
app.listen(3000)

