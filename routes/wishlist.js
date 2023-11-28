const express = require("express");
const router = express.Router();
const { Books, Wishlist, WishlistBook, Shopping, BooksToShopping, User } = require("../tables");

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
    // Check if a wishlist with the same name and user ID already exists
    const existingWishlist = await Wishlist.findOne({
      where: { WlName, UId },
    });

    if (existingWishlist) {
      return res.status(400).json({
        status: 'error',
        message: 'Wishlist with the same name and user already exists',
        data: existingWishlist,
      });
    }

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
  } catch (outerErr) {
    // Handle any error from the outer try block
    res.status(500).json({
      status: 'error',
      message: 'Error in the outer try block',
      error: outerErr,
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
      where: { WlId: WlId },
      attributes: [],
      include: [{
        model: Books,
        attributes: ['BName', 'BDesc', 'BPrice', 'BYear', 'BISBN']
      }]
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

router.delete("/moveToCart", async (req, res) => {
  const { WlId, BISBN } = req.body;

  try {
    // check if book exists in wishlist
    const wishlistBook = await WishlistBook.findOne({
      where: { WlId: WlId, BISBN: BISBN },
    });
    if (!wishlistBook) {
      return res.status(404).json({
        status: 'error',
        message: 'Book not found in wishlist',
      });
    }

    // get wishlist to obtain user id
    const wishlist = await Wishlist.findOne({
      where: { WlId: wishlistBook.WlId },
    });

    // get user
    const user = await User.findOne({
      where: { UId: wishlist.UId },
    });

    // get user's shopping cart
    let shoppingCart = await Shopping.findOne({
      where: { UId: user.UId },
    });

    // if user doesn't have a shopping cart then create one
    if (!shoppingCart) {
      shoppingCart = await Shopping.create({
        UId: user.UId
      });
    }

    // Logic to move the book from wishlist to shopping cart

    // Add book to ShoppingCart 
    await BooksToShopping.create({
      SId: shoppingCart.SId,
      BISBN: BISBN
    });

    // Remove book from WishlistBook
    await WishlistBook.destroy({
      where: { WlId: WlId, BISBN: BISBN }
    });

    return res.status(200).json({
      status: 'success',
      message: 'Item moved from wishlist to cart',
      shoppingCart
    });

  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Error while moving item from wishlist to cart',
      error: err,
    });
  }
});


module.exports = router;

