import { Sequelize, Op } from "sequelize";
import { Wishlist, create as WishlistCreate } from '../tables/Wishlist.js';
import { Book } from '../tables/Book.js';

export const getWishlists = async (req, res) => {

    await Wishlist.findAll()
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

export const create = async(req, res) => {
        
    const {Name, UserId} = req.body;

    return WishlistCreate(
        Name,
        UserId,
    )
       .then((result) => {
        if (result.status == 'success') {
            return res.status(201).json({
                status: 'success',
             message: 'Wishlist created', 
             data: result.data,
            });
        }
        return res.status(400).json({status: 'error', message: 'error',
         error: result.data,});
       }) 
    .catch((err) => {
        res.status(400).json({
            status: 'error',
            message: 'error',
            error: err,
        })
    })}


export const addBook = async(req, res) => {

const {BookId, WishlistId} = req.body;

try{
    const book = await Book.findByPk(BookId);
    if(!book)
    {
        return res.status(404).send({error: 'Book not found'});
    }

    const wishlist = await Wishlist.findByPk(WishlistId);
    if(!wishlist)
    {
        return res.status(404).send({error: 'Wishlist not found'});
    }

    await wishlist.addBook();

        res.send({message: 'Book added to Wishlist'})

} catch(e) {
    console.log('error');
}
};

export const listBooks = async(req, res) => {

    const {WishlistId} = req.body;

    await Wishlist.findByPk(WishlistId,{
        include: Book,
    })
.then((result) => res.status(200).send({
    status: 'success',
    data: result,
}))
.catch((err) => res.status(401).send({
    status: 'error',
    data: err,
}));
    
};