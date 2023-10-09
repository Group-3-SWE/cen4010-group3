//Require module
const express = require('express');
const router = express.Router()
const { User } = require("../tables");


router.get("/", async (req, res, next) =>{
    try {
        // Query for all users.
        const vUser = await User.findAll({
            raw: true
        });
        return res.status(201).json(vUser)
    } catch(err){
        // If an error happens, pass the request to the error handling route.
        next(err)
    }
})


router.post("/createuser", async (req, res) => {
    
    const {UUser, UPassword, UEMAIL, UAddress, UName} = req.body;

    if (!UUser || !UPassword || !UEMAIL){
        res.status(200).send('Please input required fields');
    }
    if (!UAddress){
        UAddress: null;
    }
    if (!UName) {
        UName: null;
    }
    let userExists = await User.findOne({
        where: {
            UUser
        }
    })
    let emailExists = await User.findOne({
        where: {
            UEMAIL
        }
    })
    if (userExists) {
        res.status(202).send('User already exists.')
    }
    if (emailExists) {
        res.status(203).send('Email already exists.')
    }
    try {
        await User.create({UUser, UPassword, UEMAIL, UAddress, UName});
        const nUser = await User.findOne({
            where: {
                UUser
            }
        })
        res.status(201).json(nUser.UUser)
    }
    catch {
        res.send("User Not Added")
    }
})

module.exports = router