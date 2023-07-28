const express = require("express");

const router = express.Router();
const users = [];

router.get('/', (req, res) => {
    res.render('add-user.ejs', {docTitle: 'Add users'});
});

router.post('/add-user', (req, res) => {
    users.push({name: req.body.name});
    res.redirect('/users');
});

router.get('/users', (req, res) => {
    res.render('users', {docTitle: 'Users', users});
});

module.exports = router;