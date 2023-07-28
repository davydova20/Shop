const express = require("express");
const path = require("path");
const rootDir = require("../helpers/path");
const router = express.Router();

router.get("/users", (req, res, next) => {
    console.log("here2")
    res.sendFile(path.join(rootDir, "views", "users.html"));
});

module.exports = router;