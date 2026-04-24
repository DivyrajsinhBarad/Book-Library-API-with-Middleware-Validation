const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let books = [];

// GET all books
router.get('/', (req, res) => {
    res.json(books);
});

// POST add book
router.post('/', (req, res) => {
    const { title, author, genre } = req.body;
    
    if (!title || !author) {
        return res.status(400).json({ message: 'Title and Author required' });
    }
    
    const newBook = {
        id: uuidv4(),
        title,
        author,
        genre: genre || 'General',
        status: 'available'
    };
    
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT update book
router.put('/:id', (req, res) => {
    const book = books.find(b => b.id === req.params.id);
    
    if (!book) {
        return res.status(404).json({ message: 'Book not found' });
    }
    
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.genre = req.body.genre || book.genre;
    book.status = req.body.status || book.status;
    
    res.json(book);
});

// DELETE book
router.delete('/:id', (req, res) => {
    books = books.filter(b => b.id !== req.params.id);
    res.json({ message: 'Book deleted' });
});

module.exports = router;
