const express = require("express")
const router = express.Router()
const { Books } = require("../tables");

router.get("/", (req, res) => {
    res.send("This is the books route!");
})

router.get("/genre/:genre", async (req, res, next) =>{
    try {
        // get the list of books belonging to a specific genre
        const { genre } = req.params
        const listOfBooks = await Books.findAll({ where: {BGenre: genre} })
        return res.status(200).json({ listOfBooks })
    } catch(err){
        next(err)
    }
})

router.post("/", async (req, res) => {
    const book = req.body;
    await Books.create(book);
    res.json(book);
})

module.exports = router