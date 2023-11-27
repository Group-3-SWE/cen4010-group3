const express = require("express");
const router = express.Router();
const { Books, Wishlist, WishlistBook, ShoppingCart, WBooksToShopping } = require("../tables");

router.get("/", async (req, res) => {
  try {
    const result = await Wishlist.findAll();
    res.status(200).send({
      status: 'success',
      data: result,
    });
  } catch (err) {
    res.status(500).send({
      status: 'error',
      message: 'Request Error',
      error: err,
    });
  }
});

router.post("/", async (req, res) => {
  const { WlName, UId } = req.body;

  try {
    const result = await Wishlist.create({
      WlName,
      UId
    });

    if (result) { // Assuming that successful creation returns a result
      return res.status(201).json({
        status: 'success',
        message: 'Wishlist created',
        data: result, // Return the created entry
      });
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'Failed to create wishlist',
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: 'Error while creating wishlist',
      error: err,
    });
  }
});


// addToWishlist
router.post("/addBook", async (req, res) => {
  const { WlId, BISBN } = req.body;

  try {
    // Assuming that addToWishlist is a method that adds a book to a wishlist
    const result = await WishlistBook.create({
      WlId,
      BISBN
    });

    if (result) {
      return res.status(201).json({
        status: 'success',
        message: 'Book successfully added to wishlist',
        data: result,
      });
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'Failed to add book to wishlist',
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: 'Error while adding book to wishlist',
      error: err,
    });
  }
});


// get wishlist content
router.get("/wishlistContent", async (req, res, next) => {
  const { WlId } = req.body;


  console.log('start');
  if (!WlId) {
    console.log('wishlist not found');
    return res.status(400).json({
      status: 'error',
      message: 'WlId parameter is required'
    });
  }

  try {
    // Check if the wishlist exists
    console.log('check if wishlist exists');
    console.log(WlId);
    const wishlist = await WishlistBook.findAll({ 
      where: { WlId : WlId},
      attributes: [],
      include: [{ model: Books,
         attributes: ['BName', 'BDesc', 'BPrice', 'BYear', 'BISBN']}]
      });
    if (!wishlist) {
      return res.status(404).json({
        status: 'error',
        message: 'Wishlist not found'
      });
    }
    return res.status(200).json(wishlist)


    
  } catch (err) {
      next(err)
  }
});

router.delete("/moveToCart", async (req, res, next) => {
  const { WlId, BISBN } = req.body;


  try {
    const wishlistBook = await WishlistBook.findAll({
      where: { WlId: WlId, BISBN: BISBN },
      include: [{ model: Wishlist }] 
    });


   // res.json(wishlistBook);

    if (!wishlistBook) {
      return res.status(404).json({
        status: 'error',
        message: 'Book not found in the wishlist'

      });
    }

    const getUser = await
    Wishlist.findOne({
      where : {WlId: WlId}

    });



    let shoppingCart = await ShoppingCart.findAll({ where: { UserId: getUserId} });

    if (!shoppingCart) {
      const newShoppingCart = await ShoppingCart.create({
        UserId: wishlistBook.Wishlist.UId,
      });

      if (!newShoppingCart) {
        return res.status(500).json({
          status: 'error',
          message: 'Failed to create shopping cart',
        });
      }

      shoppingCart = newShoppingCart;
    }


    const result = await ShoppingCart.create({
      UserId: wishlistBook.Wishlist.UId,
      BISBN: BISBN,
    });

    await WishlistBook.destroy({
      where: { WlId: WlId, BISBN: BISBN },
    });

    if (result) {
      return res.status(201).json({
        status: 'success',
        message: 'Book successfully added to shopping cart',
        data: result,
      });
    } else {
      return res.status(400).json({
        status: 'error',
        message: 'Failed to add book to shopping cart',
      });
    }

  } catch (err) {
    next(err)
  }
});

module.exports = router;

