const { Router } = require('express');
const router = Router();
const _ = require('lodash');

const authors = require('../authors.json');
const books = require('../books.json');


// Verify if a given author has books
function hasBooks(idOfAuthor) {
    let hasBooks = false
    _.each(books, (book) => {
        if (!hasBooks) {
            const { id, name, authorId } = book;
            hasBooks = idOfAuthor == book.authorId;
        }
    })
    return hasBooks;
}

// 1 - Get all authors
router.get('/authors', (req, res) => {
    res.json(authors);
});


// 3- Add an author
router.post('/authors', (req, res) => {
    const {id, name, lastname} = req.body; 
    
    if (id && name && lastname) {
        const newAuthor = { ...req.body };
        authors.push(newAuthor);    
        res.json({'added': 'ok'});
    }else{
        res.status(400).json({'statusCode': 'Bad Request'});
    }

});


// 5- Modify an author
router.put('/authors/:id', (req, res) => {
    const id = req.params.id;
    const {name, lastname} = req.body;
    
    _.each(authors, (author) => { 
        if(author.id == id){
            author.name = name ? name : author.name;
            author.lastname = lastname ? lastname : author.lastname;
        }
    });
    res.json({'modified': 'ok'});
});

// 7- Delete an author
router.delete('/authors/:id', (req, res) => {
    const id = req.params.id;
    if (!hasBooks(id)) {
        _.remove(authors, (author) => {
            return author.id == id
        })
        res.json(authors);
    } else { res.status(400).json({ 'statusCode': `Bad Request, please delete all of the author's books previously `});
    }
 });

module.exports = router;