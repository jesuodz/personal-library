const chaiHttp  = require('chai-http');
const chai      = require('chai');
const assert    = chai.assert;
const app       = require('../app');
const Book      = require('../models/Book');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  suiteSetup(() => {
    Book.deleteMany({}).then(() => {}).catch(err => console.log(err));
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
    
    test('I can add a book', () => {
      chai
        .request(app)
        .post('/api/books')
        .send({
          title: 'The Pragmatic Programmer'
        })
        .then( res => {
          assert.equal(res.status, 200);
          assert.equal(res.body.title, 'The Pragmatic Programmer');
          assert.exists(res.body._id);

        }).catch(err => console.log(`${err}`));
    });
    
    test('Missing required fields', () => {
      chai
        .request(app)
        .post('/api/books')
        .send({
          title: ''
        })
        .then( res => {
          assert.equal(res.status, 400);
          assert.equal(res.body.title, 'no title sent');
          assert.notExists(res.body._id);

        }).catch(err => console.log(`${err}`));
    });
    
  });
  
  suite('GET /api/books => Array of objects with book data', () => {
    
    suiteSetup( () => {
      const books = [
        { 
          title: 'Automate The Boring Stuff With Python',
          comments: [{ text: 'An excellent book'}, { text: 'OMG!'}]
        },
        { title: 'Clean Architecture: A Craftsman\'s Guide to Software Structure and Design' }
      ];
      Book.insertMany(books).then(() => {}).catch(err => console.log(err));
    });

    test('Array of books', () => {
      chai.request(app).get('/api/books').then(res => {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        assert.equal(res.body.length, 3);
        assert.equal(res.body[1].title, 'Automate The Boring Stuff With Python');
        assert.exists(res.body[1]._id);
        assert.equal(res.body[1].commentcount, 2);
      }).catch(err => console.log(err));
    });
    
    test('Not found', () => {
      chai.request(app).get('/api').then(res => {
        assert.equal(res.status, 404);
        assert.exists('notfound');
        assert.equal(res.body.notfound, 'resource not found');
      }).catch(err => console.log(err));
    });

    test('No books stored', () => {
      Book.deleteMany({}).then(() => {});

      chai.request(app).get('/api/books').then(res => {
        assert.equal(res.status, 400);
        assert.exists('nobooks');
        assert.equal(res.body.nobooks, 'no books stored');
      }).catch(err => console.log(err));
    });
    
  });
    
  suite('DELETE /api/books/:_id => text', () => {
    let booksIDs = [];
    suiteSetup( () => {
      const books = [
        { 
          title: 'Automate The Boring Stuff With Python',
          comments: [{ text: 'An excellent book'}, { text: 'OMG!'}]
        },
        { title: 'Clean Architecture: A Craftsman\'s Guide to Software Structure and Design' },
        { title: 'The Pragmatic Programmer' }
      ];
      Book.insertMany(books).then(bookarr => {
        booksIDs = bookarr.map(book => String(book._id) );
      }).catch(err => console.log(err));
      
    });
    
    test('No book exists', () => {
      const wrongID = booksIDs.slice(1) + 1;
      chai.request(app).delete(`/api/books/${wrongID}`).then(res => {
        assert.equal(res.status, 404);
        assert.equal(res.body.notfound, 'book no exists');
      }).catch(err => console.log(err));
    });
    
    test('Valid _id', () => {
      chai.request(app).delete(`/api/books/${booksIDs[2]}`).then(res => {
        assert.equal(res.status, 200);
        assert.equal(res.body.success, booksIDs[2]);
      }).catch(err => console.log(err));
    });

  });
  /*
  suite('GET /api/books/:_id => text', () => {
    
    test('No _id', () => {
      
    });
    
    test('Valid _id', () => {
      
    });

    test('Invalid _id', () => {

    });
    
    test('Comment count must be zero', () => {
      chai.request(app).get('/api/books')
    });

  });

  suite('POST /api/books/:_id => text', () => {
    
    let IDtest = '';

    suiteSetup( () => {
      IDtest = Book.fin()().then(book => book._id)
    });
    
    test('No _id', () => {
      chai.request(app).post('api/books').then(res => {
      })
    });
    
    test('Valid _id', () => {
      chai.request(app).post(`/api/books/${IDtest}`).then(res => {
      })
    });

    test('Invalid _id', () => 
    });
  
  }); 
  */
});