const express = require("express");
const path = require("path");

const rootDir = require("./helpers/path");

const app = express();
app.use(express.static(path.join(rootDir, "public")));

const mainRouter = require("./routes/main");
app.use(mainRouter);

const usersRouter = require("./routes/users");
app.use(usersRouter);


app.listen(3000);
