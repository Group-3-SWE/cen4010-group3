const express = require("express")
const router = express.Router()
const { Books, Comment, Sequelize} = require("../tables");
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
        // For instance, /books/genre/1 would result in the request parameter being 1.
        const { genre } = req.params
        // Query for all the entries that match the desired genre.
        const listOfBooks = await Books.findAll({ where: {GId: genre} })
        return res.status(200).json(listOfBooks)
    } catch(err){
        // If an error happens, pass the request to the error handling route.
        next(err)
    }
})
/* 
 * Endpoint that handles GET requests to fetch a list of the 10 most sold books, if there are at least 10.
 * @return a JSON list of the 10 most sold books, along with a 200 status code, if successful.
 */
router.get("/bestsellers", async (req, res, next) =>{
    try {
        // Query for the 10 best selling books.
        const bestSellers = await Books.findAll({ 
            limit: 10,
            order: [['BCopiesSold', 'DESC']]
        })
        return res.status(200).json(bestSellers)
    } catch(err){
        // If an error happens, pass the request to the error handling route.
        next(err)
    }
})
router.get("/rating/:ratingThreshold", async (req, res, next) =>{
    try {
        const { ratingThreshold } = req.params
        const filteredBooks = await Books.findAll({
            include: [{
                model: Comment,
                attributes: [],
                where: {
                    BISBN: Sequelize.col('Books.BISBN')
                },
            }],
            group: ['Books.BISBN'],
            having: Sequelize.literal(`AVG(comments.CRating) >= ${ratingThreshold}`),
        })
        return res.status(200).json(filteredBooks)
    } catch(err){
        next(err)
    }
})
router.post("/", async (req, res) => {
    const book = req.body;
    await Books.create(book);
    res.json(book);
})

router.get("/Book/:ISBNN", async(req, res, next) => {
    try {
        // Step 1: request the ISBN (bookID)
        const { ISBNN } = req.paramsnpm

        // Step 2: create an array with all the comments from the database
        const listOfComments = await Comment.findAll({ attributes: ["CommentContent"], where: {ISBN: ISBNN}})
        // Step 3: return the array with all comments
        return res.status(200).json(listOfComments)

        // const { ISBNN } = req.params

        // var count = 0;
        // var sum = 0;


    } catch (err) {
        next(err)
    }
})

module.exports = router