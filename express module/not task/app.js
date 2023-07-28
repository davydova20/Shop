const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const rootDir = require("./helpers/path");

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, 'public')));

const adminRoutes = require("./routes/admin");
app.use('/admin', adminRoutes);

const shopRoutes = require("./routes/shop");
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, "views", "error-page.html"));
}); //for all not matching routs
app.listen(3000)

