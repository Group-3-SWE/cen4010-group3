//Require module
const express = require('express');
const router = express.Router()
const { User } = require("../tables");


router.get("/", async (req, res, next) =>{
    try {
        // Query for all users.
        const vUser = await User.findAll();
        return res.status(201).json(vUser)
    } catch(err){
        // If an error happens, pass the request to the error handling route.
        next(err)
    }
})

router.get("/:id", async (req, res, next) =>{
    try {
        // Find a list of credit cards for a user
        const vUser = await User.findOne({
            where: {
                UUser: req.params.id
            }
        });
        return res.status(201).json(vUser)
    } catch(err){
        // If an error happens, pass the request to the error handling route.
        next(err)
    }
})

//Creates a new user for the Users db
router.post("/createuser", async (req, res) => {
    
    const {UUser, UPassword, UEMAIL, UAddress, UName} = req.body;

    //Checks to see if Required fields are entere
    if (!UUser || !UPassword){
        res.status(200).send('Please input required fields');
        return
    }

    //If Address is not entered, it sets it to null
    if (!UAddress){
        UAddress: null;
    }
     //If Name is not entered, sets value to null
    if (!UName) {
        UName: null;
    }
        
    //checks to see if user already exists
    let userExists = await User.findOne({
        where: {
            UUser
        }
    })

    //Checks to make sure email is unique else if not entered gives it a value of null
    if (UEMAIL){
        let emailExists = await User.findOne({
            where: {
                UEMAIL
            }
        })
        if (emailExists) {
            res.status(203).send('Email already exists.');
            return
        }
    } else {
        UEMAIL: null;
    }
    if (userExists) {
        res.status(202).send('User already exists.');
        return
    }

    //adds new user
    try {
        await User.create({UUser, UPassword, UEMAIL, UAddress, UName});
        const nUser = await User.findOne({
            where: {
                UUser
            }
        })
        res.status(201).json(nUser);
        return
    }
    catch {
        res.send("User Not Added");
        return
    }
})

module.exports = router