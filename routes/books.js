const express = require("express")
const router = express.Router()
const { Books } = require("../tables");
const { where } = require("sequelize");


router.get("/", (req, res) => {
    res.send("This is the books route");
})

router.post("/", async (req, res) => {
    const book = req.body;
    await Books.create(book);
    res.json(book);
})
module.exports = router


//find the book where the ISBN is:
router.get("/booksByISBN", async (req, res) => {
const listOfBooks = await Books.findAll({
    where: {
        BISBN : "1204958",
    },

})
res.json(listOfBooks);
      });

router.post("/createAuthor", async (req, res) => {
    const authorInfo = req.body;
    await Books.create(BAuthor);
    res.json(BAuthor);
})




