const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", 'ejs');

const usersRouter = require("./routes/user");
app.use(usersRouter);

app.listen(3000);