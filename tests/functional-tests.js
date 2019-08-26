const chaiHttp  = require('chai-http');
const chai      = require('chai');
const assert    = chai.assert;
const app       = require('../app');
const Book      = require('../models/Book');
chai.use(chaiHttp);

suite('Functional Tests', () => {
  suiteSetup( async () => {
    await Book.deleteMany({});
  });

  suiteTeardown( async () => {
    const books = [
      { 
        title: 'Automate The Boring Stuff With Python',
        comments: [{ text: 'An excellent book'}, { text: 'OMG!'}]
      },
      { title: 'Clean Architecture: A Craftsman\'s Guide to Software Structure and Design' },
      { title: 'The Pragmatic Programmer' }
    ];

    await Book.insertMany(books);
  })

  test('Return {msg: \'Test Works\'}', () => {
    chai
      .request(app)
      .get('/api/books/test')
      .then( res => {
        assert.equal(res.status, 200);
        assert.exists(res.body.msg);
        assert.equal(res.body.msg, 'Test works');
      }).catch(err => console.log(err));
  });

  suite('POST /api/books/ => object with book data', () => {
    const soleBook = { title: 'The Pragmatic Programmer' };

    test('I can add a book', async () => {
      const res = await chai.request(app).
        post('/api/books').
        send(soleBook).
        then(res => res);

      assert.equal(res.status, 200);
      assert.equal(res.body.title, 'The Pragmatic Programmer');
      assert.exists(res.body._id);
    });
    
    test('Missing required fields', async () => {
      const res = await chai.request(app).
        post('/api/books').
        send({ title: '' }).
        then(res => res);

      assert.equal(res.status, 400);
      assert.equal(res.body.title, 'no title sent');
      assert.notExists(res.body._id);
    });
  });
  
  suite('GET /api/books => Array of objects with book data', () => {
    
    suiteSetup( async () => {
      const books = [
        { 
          title: 'Automate The Boring Stuff With Python',
          comments: [{ text: 'An excellent book'}, { text: 'OMG!'}]
        },
        { title: 'Clean Architecture: A Craftsman\'s Guide to Software Structure and Design' }
      ];
      await Book.insertMany(books);
    });

    test('Array of books', async () => {
      const res = await chai.request(app).
        get('/api/books').
        then(res => res);

      assert.equal(res.status, 200);
      assert.isArray(res.body);
      assert.equal(res.body.length, 3);
      assert.equal(res.body[1].title, 'Automate The Boring Stuff With Python');
      assert.exists(res.body[1]._id);
      assert.equal(res.body[1].commentcount, 2);
    });

    test('No books stored', async () => {
      await Book.deleteMany({});

      const res = await chai.request(app).
        get('/api/books').
        then(res => res);

      assert.equal(res.status, 400);
      assert.exists('nobooks');
      assert.equal(res.body.nobooks, 'no books stored');
    });
  });
    
  suite('DELETE /api/books/:_id => success object', () => {
    let booksIDs = [];

    suiteSetup( async () => {
      const books = [
        { 
          title: 'Automate The Boring Stuff With Python',
          comments: [{ text: 'An excellent book'}, { text: 'OMG!'}]
        },
        { title: 'Clean Architecture: A Craftsman\'s Guide to Software Structure and Design' },
        { title: 'The Pragmatic Programmer' }
      ];

      await Book.insertMany(books).then(bookarr => {
        booksIDs = bookarr.map(book => String(book._id) );
      });
    });
    
    test('No book exists', async () => {
      const wrongID = booksIDs.slice(1) + 1;
      
      const res = await chai.request(app).
        delete(`/api/books/${wrongID}`).
        query({ id: wrongID }).
        then(res => res);
      
      assert.equal(res.status, 404);
      assert.equal(res.body.notfound, 'book no exists');
    });
    
    test('Valid _id', async () => {
      const res = await chai.request(app).
        delete(`/api/books/${booksIDs[2]}`).
        then(res => res);
      
      assert.equal(res.status, 200);
      assert.equal(res.body.success, booksIDs[2]);
    });
  });
  
  suite('GET /api/books/:_id => book object', () => {
    
    test('Comment array length must be 2', async () => {
      const query = { title: 'Automate The Boring Stuff With Python' };
      const _id = await Book.findOne(query).then(book => book._id);

      const res = await chai.request(app).
        get(`/api/books/${_id}`).
        then(res => res);
      
      assert.equal(res.status, 200);
      assert.equal(res.body.title, query.title);
      assert.equal(res.body.comments.length, 2);
    });

    test('Comment array length must be 0', async () => {
      const newBook = { title: 'The Pragmatic Programmer' };
      const _id = await new Book(newBook).save().then(book => book._id);

      const res = await chai.request(app).
        get(`/api/books/${_id}`).
        then(res => res);
      
      assert.equal(res.status, 200);
      assert.equal(res.body.comments.length, 0);
    });

    test('Book not found', async () => {
      const res = await chai.request(app).
        get('/api/books/notfound').
        then(res => res);
      
      assert.equal(res.status, 404);
      assert.equal(res.body.notfound, 'book not found');
    });

  });
  
  suite('POST /api/books/:_id => book object', () => {
    
    let IDtest = '';

    suiteSetup( async () => {
      IDtest = await Book.findOne().then(book => String(book._id));
    });
     
    test('Not found', async () => {
      
      const wrongID = IDtest.slice(1) + 1;

      const res = await chai.request(app).
        post(`/api/books/${wrongID}`).
        send({ comment: 'comment' }).
        then(res => res);
      
      assert.equal(res.status, 404);
      assert.equal(res.body.notfound, 'book not found');
    });

    test('No comment sent', async () => {
      const res = await chai.request(app).
        post(`/api/books/${IDtest}`).
        then(res => res);
      
      assert.equal(res.status, 400);
      assert.equal(res.body.comment, 'Comment is required');
    });

    test('Valid _id', async () => {
      const res = await chai.request(app).
        post(`/api/books/${IDtest}`).
        send({ comment: 'I like it!'}).
        then(res => res);
      
      assert.equal(res.status, 200); // IDs must be sorted by most recent
      assert.equal(res.body.comments[0].text, 'I like it!');
    });
  
  });
  
  suite('DELETE /api/books/', () => {

    test('Complete delete successful', async () => {
      const res = await chai.request(app).
        delete('/api/books/').
        then(res => res);

      assert.equal(res.status, 200);
      assert.equal(res.body.msg, 'Complete delete successful');
      assert.equal(res.body.booksCount, 3);
    });
  })

});