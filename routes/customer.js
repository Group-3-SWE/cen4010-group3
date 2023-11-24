//Require module
const express = require('express');
const router = express.Router()
const { User } = require("../tables");

//Return User Data
router.get("/", async (req, res, next) =>{

    const {UUser} = req.body;
    if (!UUser) {
        res.send("Please enter UUser");
        return;
    }
    try {
        // Check if user exists
        const vUser = await User.findOne({
            where: {
                UUser
            }
        });
        if (!vUser){
            res.send("User Does Not Exist");
            return;
        } else {
            return res.status(201).json(vUser)
        }     
    } catch(err){
        // If an error happens, pass the request to the error handling route.
        next(err)
    }
})

//Creates a new user in the Users DB
router.post("/createuser", async (req, res) => {
    
    const {UUser, UPassword, UEMAIL, UAddress, UName} = req.body;

    //Checks to see if Required fields are entere
    if (!UUser || !UPassword){
        res.status(400).send('Please input required fields');
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
    if (userExists) {
        res.status(202).send('User already exists.');
        return
    }

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

//Updates a user in the Users db
router.patch("/updateuser", async (req, res, next) => {
    
    const {UUser, UPassword, UEMAIL, UAddress, UName} = req.body;
    
    //checks to see if id exists in UUname
    let userExists = await User.findOne({
        where: {
            UUser
        }
    })
    if (!userExists) {
        res.status(202).send('User does not exists.');
        return
    }

    //updates UPassword
    if (UPassword){
        try{
            await User.update({ UPassword}, {
            where: {
                UUser
                },
            });
        }
        catch(err){
            // If an error happens, pass the request to the error handling route.
            next(err)
        }
    }

     //If Email is entered, checks to see if email is null, if it is, then checkes to see if email exists in db and if it doesn't add it
     //If Email is not null then mail cannot be updated and returns.
    if (UEMAIL) {
        if (userExists.UEMAIL == null) {
            let emailExists = await User.findOne({
                where: {
                    UEMAIL
                }
            })
            if (emailExists) {
                res.status(203).send('Email already exists.');
                return
            } else {
                try{
                    await User.update({ UEMAIL}, {
                    where: {
                        UUser
                        },
                    });
                }
                catch(err){
                    // If an error happens, pass the request to the error handling route.
                    next(err)
                }
            }
        } else {
            res.send("Mail Cannot Be Changed.");
            return;
        }
    }
    
    //Updates the value of UAddress
    if (UAddress){
        try{
            await User.update({ UAddress}, {
            where: {
                UUser
                }
            });
        }
        catch(err){
            // If an error happens, pass the request to the error handling route.
            next(err)
        }
    }
    
    //Updates the value of UName
    if (UName) {
        try{
            await User.update({ UName }, {
            where: {
                UUser
                }
            });
        }
        catch(err){
            // If an error happens, pass the request to the error handling route.
            next(err)
        }
    }
    
    // checks to make sure some information is added.
    if (!UPassword && !UName && !UAddress && !UEMAIL) {
        res.send("No valid information entered");
        return;
    }
    else {
        res.send("Updated");
        return;
    }    
})

module.exports = router