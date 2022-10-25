const booksService = require('../services/books');
const reviewsService = require("../services/reviews");
const createError = require('http-errors');

exports.getBooks = (req, res) => {
   const books = booksService.getBooks();
   res.json({success: true, data: books});
}

exports.getBookById = (req, res) => {
   let bookId = parseInt(req.params.id);
   if (isNaN(bookId)) {
      throw new createError(400, "the id in parameter must be a valid integer");
   }
   const book = booksService.getBookById(bookId);
   if (bookId && book) {
      res.json({success: true, data: book});
   } else {
      throw new createError(404, "no book found for this id");
   }
}

exports.addBook = (req, res) => {
   if (req.body && req.body.title && req.body.date) {
      const listOfBooks = booksService.getBooks();
      const id = listOfBooks.length + 1;
      let bookAdded = false;
      let error = null;
      try {
         bookAdded = booksService.addBook(id, req.body.title, req.body.date);
      } catch (e) {
         error = e;
      } finally {
         if (bookAdded) {
            res.status(201).json({success: true, message: `Book has been added with id=${id}`});
         } else {
            res.status(400).json({success: false, message: 'Book has not been added', error});
         }
      }
   } else {
      res.status(400).json({success: false, message: 'Cannot add this book, make sure all args has been sent'});
   }
}

exports.deleteBookById = (req, res) => {
   if (req.params.id) {
      const book = booksService.getBookById(req.params.id);
      if (book) {
         booksService.deleteBookById(req.params.id);
         reviewsService.deleteReviewsForBook(req.params.id);
         res.json({success: true, message: 'Book has been deleted'});
      } else {
         res.status(404).json({success: false, message: `The book with id ${req.params.id} doesn't exists, it cannot be deleted`});
      }
   } else {
      res.status(400).json({success: false, message: 'The bookId is required'});
   }
}