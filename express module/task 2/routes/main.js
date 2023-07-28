const express = require("express");
const path = require("path");
const rootDir = require("../helpers/path");

const router = express.Router();

router.get("/", (req, res) => {
    console.log("here1")
    res.sendFile(path.join(rootDir, "views", "index.html"));
})

module.exports = router;