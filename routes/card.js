//Require module
const express = require('express');
const router = express.Router()
const { Payment } = require("../tables");
const { User } = require("../tables");


router.get("/", async (req, res, next) =>{
        return res.status(201).send('This is a Payments Database')
})

router.get("/:id", async (req, res, next) =>{
    try {
        // Find a list of credit cards for a user
        const card = await Payment.findAll({
            where: {
                PUser: req.params.id
            }
        });
        return res.status(201).json(card)
    } catch(err){
        // If an error happens, pass the request to the error handling route.
        next(err)
    }
})

//Add a new credit card
router.post("/newCard", async (req, res) => {
    
    const {User, PCard} = req.body;

    //makes sure not null values are entered
    if (!PUser || !PCard){
        res.status(200).send('Please input required fields');
        return
    }

    //checks to see if the PCard is a number
    if (isNaN(PCard)){
        res.status(202).send('This is not a number');
        return
    }

    //Looks at Users table to see if username exists
    const findUser = await User.findOne({
        where: {
            User
        }
    })
    //const UId = await sequelize.query('select UId from Users where UUser = User', { type: Sequelize.QueryTypes.SELECT });


    if (!findUser) {
        res.status(201).send('User does not exist');
        return
    } 
    
    //checks to see if card is added already
    let cardExists = await Payment.findOne({
        where: {
            PCard
        }
    })
    if (cardExists){
        res.status(201).send('Card already exists in system');
        return
    }

    //trys to add the card to the Payments DB
    try {
        await Payment.create({PCard, UId});
        res.status(201).send('added');
        return
    }
    catch {
        res.status(401).send('Error Adding Card');
        return
    }
})

module.exports = router