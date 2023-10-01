//Require module
const express = require('express');
const router = express.Router()
const { Customer } = require("../tables");

router.get("/", (req, res) => {
    res.send("Hello World!");
});

module.exports = router