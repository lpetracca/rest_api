const { Router } = require('express');
const router = Router();
const _ = require('lodash');

const authors = require('../authors.json')
const books = require('../books.json');


// Verify that the author exists
function authorVerification(authorId) {
    let isAuthor = false;
    _.each(authors, author => {
        if (!isAuthor) {
            const { id, name, lastname } = author;
            isAuthor = authorId == author.id
        }
    })
    return isAuthor;
}

//2- Get all books with the author
router.get('/books', (req, res) => {
    let newBooks = [];         
    
    _.each(books, (book) => {     
        const { id, name, authorId } = book;
        
        _.each(authors, (author) => {
            const { id, name, lastname } = author;
            author.id == book.authorId ? newBooks.push(book, author) : '';
        })

    })
    res.json(newBooks); 
});


// 4 - Add a book if the author exists already
router.post('/books', (req, res) => {
    const { id, name, authorId } = req.body;    

    if (authorVerification(authorId) && id && name && authorId) {
        const newBook = { ...req.body };
        books.push(newBook);
        res.json({ 'added': 'ok' });
    
    } else {
        res.status(400).json({ 'statusCode': 'Bad Request, please verify information or add author' });
    }
})


// 6- Modify a book
router.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const { name, authorId } = req.body;
    
    
    _.each(books, (book) => { 
        if (book.id == id) {
            if (authorVerification(authorId)) {
                book.name = name ? name : book.name;
                book.authorId = authorId ? authorId : book.authorId;
                res.json({ 'modified': 'ok' });
            } else {
                res.status(400).json({ 'statusCode': 'Bad Request, please input a valid author Id' });
            }
        }
    });
    
});


// 8- Delete a book
router.delete('/books/:id', (req, res) => { 
    const id = req.params.id;
    
    _.remove(books, (book) =>{   
        return book.id == id;
    })

    res.json(books);
});

module.exports = router;
