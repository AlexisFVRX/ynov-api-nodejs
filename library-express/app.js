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

app.use((error, req, res, next) => {
    res.status(error.status || 500)
        .json({success: false, message: error.message});
});

module.exports = app;