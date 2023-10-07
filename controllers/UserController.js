import { Sequelize } from "sequelize";
import {User } from '../tables/User.js';
export const getUsers = async (req, res) => {
    //res.send("This is the users route!");

    await User.findAll()
    .then((result) => {
        res.status(200).send({
            status: 'success',
            data: result,
        });
    })
    .catch((err) => res.status(500).send({
        status: 'error',
        message: 'Request Error',
        error: err,
    }));
    };

