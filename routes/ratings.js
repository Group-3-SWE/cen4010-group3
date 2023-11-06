const express = require("express");
const Sequelize = require('sequelize');
const { Ratings, sequelize } = require("../tables");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Ratings route");
});

router.post("/AUser/:UserID/Books/:ISBN/:Rating", async (req, res, next) => {
    try {
        const user = req.params.UserID;
        const rate = req.params.Rating;
        const isbn = req.params.ISBN;

        const rating = await Ratings.create({ RUser: user, RRating: rate, RISBN: isbn });

        return res.status(200).json("Rating successfully added!");
    } catch (err) {
        next(err);
    }
});

router.get("/AR/:BookID", async (req, res, next) => {
    try {
        const bookID = req.params.BookID;

        const result = await Ratings.findAll({
            attributes: [
                [sequelize.fn('AVG', sequelize.col('RRating')), 'averageRating']
            ],
            where: {
                RISBN: bookID
            }
        });

        const avgRating = result[0].dataValues.averageRating;
        console.log('Average:', avgRating);

        return res.status(200).json({ averageRating: avgRating });
    } catch (err) {
        next(err);
    }
});

module.exports = router;