const path = require("path");

module.exports = path.dirname(process.mainModule.filename); //получить путь к каталогу (not task) основываясь на файле, которое отвечает, что наше приложение запущено - app.js

