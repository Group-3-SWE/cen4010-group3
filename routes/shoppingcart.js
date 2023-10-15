const express = require('express');
const app = express();
const port = 3000; // You can choose any available port

//REST API Actions 1st part of Shopping Cart
//Sample shopping cart data(you can replace this with your actual data)
const shoppingCartData = {
    'user' : [
        { id: 1, name: 'Book 1', price: 10},
        { id: 2, name: 'Book 2', price: 15},
        // Add more items here depending
    ],
    'user2': [
        { id: 3, name: 'Book 3', price: 20},
        { id: 4, name: 'Book 4', price: 25},
        // Add more items here
    ],
};

//Calculate subtotal for a user's shopping cart
function calculateSubtotal(userID){
    const cart = shoppingCartData[userID];
    if (!cart) {
        return 0; //User not found or empty cart
    }

    const subtotal = cart.reduce((total,item) => total + item.price, 0);
    return subtotal;
}

//Define the GET endpoint to retrieve subtotal
app.get('/subtotal/:userID', (req,res) => {
    const userID = req.params.userID;
    const subtotal = calculateSubtotal(userID);

    res.json({ subtotal });
});

//Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:$(port)`);
});
