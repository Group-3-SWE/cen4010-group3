const express = require("express")
const router = express.Router()
const { Books } = require("../tables");

router.get("/", (req, res) => {
    res.send("This is the books route!");
})

router.post("/", async (req, res) => {
    const book = req.body;
    await Books.create(book);
    res.json(book);
})

module.exports = router