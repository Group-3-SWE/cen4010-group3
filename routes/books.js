const express = require("express")
const router = express.Router()
const { Books } = require("../tables");

router.get("/", (req, res) => {
    res.send("This is the books route!");
})

/* 
 * Dynamic route that handles GET requests to fetch a list of books of any specific genre
 * @return a JSON list of the books belonging to the genre specified in the request, along with a 200 status code, if successful.
 */
router.get("/genre/:genre", async (req, res, next) =>{
    try {
        // The genre to look is extracted from the URL.
        // For instance, /books/genre/sci-fi would result in the request parameter being sci-fi.
        const { genre } = req.params

        // Query for all the entries that match the desired genre.
        const listOfBooks = await Books.findAll({ where: {BGenre: genre} })
        return res.status(200).json({ listOfBooks })
    } catch(err){
        // If an error happens, pass the request to the error handling route.
        next(err)
    }
})

router.post("/", async (req, res) => {
    const book = req.body;
    await Books.create(book);
    res.json(book);
})

module.exports = router