const express = require("express");
const router = express.Router();
const { Books, Wishlist, WishlistBook } = require("../tables");

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
router.get("/wishlistContent", async (req, res) => {
  const { WlId } = req.body;

  if (!WlId) {
    return res.status(400).json({
      status: 'error',
      message: 'WlId parameter is required'
    });
  }

  try {
    // Check if the wishlist exists
    const wishlist = await Wishlist.findOne({ where: { WlId: WlId } });
    if (!wishlist) {
      return res.status(404).json({
        status: 'error',
        message: 'Wishlist not found'
      });
    }

    // Fetch the wishlist content
    const wishlistContent = await WishlistBook.findAll({
      where: { WlId: WlId },
      include: [{
        model: Books,
        as: 'bookDetails'
      }]
    });

    if (wishlistContent && wishlistContent.length > 0) {
      const books = wishlistContent.map(entry => entry.bookDetails);
      return res.status(200).json({
        status: 'success',
        data: books
      });
    } else {
      return res.status(200).json({
        status: 'success',
        message: 'Wishlist is empty',
        data: []
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Error fetching wishlist content',
      error: err
    });
  }
});





module.exports = router;
