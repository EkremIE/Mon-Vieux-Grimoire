const express = require('express');
const {Book} = require('../models/Book');
const {books} = require('../db/books');
const {upload} = require('../middleware/multer');


async function postBook(req, res) {
    const file = req.file;
    console.log("file:",file);
    const body = req.body;
    const stringifiedBook = req.body.book;
    const book = JSON.parse(stringifiedBook);
    book.imageUrl = file.path;
    try{
    const result = await Book.create(book);
    res.send({message: "Book was added successfully", book: result});
    } catch (e) {
        console.error(e);
        res.status(500).send("Internal error" + e.message);
    }
}

function getBooks(req, res) {
    res.send(books);
}

const booksRouter = express.Router();
booksRouter.get("/", getBooks);
booksRouter.post("/",upload.single('image'),postBook);

module.exports = {booksRouter};
