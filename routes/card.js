//Require module
const express = require('express');
const router = express.Router()
const { Payment, User } = require("../tables");

//Add a new credit card
router.post("/newCard", async (req, res) => {
    
    const {AUser, PCard} = req.body;

    //makes sure not null values are entered
    if (!AUser || !PCard){
        res.status(400).send('Please input required fields');
        return
    }

    //checks to see if the PCard is a number
    if (isNaN(PCard)){
        res.status(406).send('This is not a number');
        return
    }

    //Looks at Users table to see if username exists
    const UUser = AUser;
    const findUser = await User.findOne({
        where: {
            UUser
        }
    })
    if (!findUser) {
        res.status(406).send('User does not exist');
        return
    } 

    const UId = findUser.UId;
    
    //checks to see if card is added already
    let cardExists = await Payment.findOne({
        where: {
            PCard
        }
    })
    if (cardExists){
        res.status(406).send('Card already exists in system');
        return
    }

    //trys to add the card to the Payments DB
    try {
        await Payment.create({PCard, UId});
        res.status(201).send('');
        return
    }
    catch {
        res.status(406).send('Error Adding Card');
        return
    }
})

module.exports = router