const express = require("express")
const { Comment, sequelize } = require("../tables");
const { DataTypes } = require("sequelize");
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Comments route");
})

router.get("/CC/:ISBNN", async (req, res, next) =>{

    try {
        // Step 1: request the ISBN (bookID)
        const { ISBNN } = req.params

        // Step 2: create an array with all the comments from the database
        const listOfComments = await Comment.findAll({ attributes: ["CommentContent"], where: {ISBN: ISBNN}})
        // Step 3: return the array with all comments
        return res.status(200).json(listOfComments)
    } catch (err) {
        next(err)
    }
})

router.post("/AUser/:UserID/Books/:ISBN/Comments/:CommentC", async (req, res, next) => {

    try {
        const user = req.params.UserID
        const commenting = req.params.CommentC
        const bookid = req.params.ISBN

        const comments = await Comment.build({CommentUsername: user, CommentContent: commenting, ISBN: bookid})

        await comments.save()

        return res.status(200).json("Comment successfully added!")
    } catch(err) {
        next(err)
    }
})

module.exports = router