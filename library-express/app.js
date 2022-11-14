const express = require('express');
const app = express();
const cors = require('cors');
const OpenApiValidator = require('express-openapi-validator');

app.use(cors());
app.use(express.json());
app.use(
    OpenApiValidator.middleware({
        apiSpec: './open-api.yaml'
    })
);

const booksRouter = require('./routers/books');
app.use('/books', booksRouter);
const axiosRouter = require('./routers/axios');
app.use('/axios', axiosRouter);
const loginRouter = require('./routers/login');
app.use('/login', loginRouter);

app.use((error, req, res, next) => {
    res.status(error.status || 500)
        .json({success: false, message: error.message, status: error.status});
});

module.exports = app;