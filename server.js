import express  from 'express';
import morgan from 'morgan';
// const db = require("./tables")
import usersRoutes from './routes/users.js';
import wishlistsRoutes from './routes/wishlists.js';
// const { NotFoundError } = require("./utils/errors")
import sequelize from './tables/index.js';
import bodyParser from 'body-parser';

const app = express()

app.use(morgan("tiny"))
app.use(express.json());

sequelize.connect();

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

// db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    });
// });
