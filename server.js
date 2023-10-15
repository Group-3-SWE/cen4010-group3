const express = require("express")
const morgan = require("morgan")
const db = require("./tables")
const booksRoutes = require("./routes/books") 
const customerRoutes = require("./routes/customer") 
const cardRoutes = require("./routes/card") 
const { NotFoundError } = require("./utils/errors")
import usersRoutes from './routes/users.js';
import wishlistsRoutes from './routes/wishlists.js';
import bodyParser from 'body-parser';

const app = express()

app.use(morgan("tiny"))
app.use(express.json());

app.use("/books", booksRoutes);
app.use("/users", customerRoutes);
app.use("/card", cardRoutes);

app.use("/users", usersRoutes);
app.use("/wishlists", wishlistsRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


// app.use((req, res, next) => {
//     return next(new NotFoundError())
// })

// app.use((error, req, res, next) => {
//     const status = error.status || 500
//     const message = error.message

//     return res.status(status).json({
//         error: { message, status }
//     })
// })
const port = 3001

 db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    });
});

