const chaiHttp  = require('chai-http');
const chai      = require('chai');
const assert    = chai.assert;
const app       = require('../app');
const Book      = require('../models/Book');

chai.use(chaiHttp);

suite('Functional Tests', () => {

  suiteSetup(done => {
    Book.deleteMany({}).then(() => done());
  })

  test('Return {msg: \'Test Works\'}', () => {
    chai
      .request(app)
      .get('/api/books/test')
      .then( res => {
        assert.equal(res.status, 200);
        assert.exists(res.body.msg);
        assert.equal(res.body.msg, 'Test works');
      })
  });

  suite('POST /api/books/ => object with book data', () => {
    
    test('I can add a book', done => {
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
          done();
        }).catch(err => console.log(`${err}`));
    });
    
    test('Missing required fields', done => {
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
          done();
        }).catch(err => console.log(`${err}`));
    });
    
  });
  
  suite('GET /api/books => Array of objects with book data', () => {
    
    suiteSetup( done => {
      const books = [
        { 
          title: 'Automate The Boring Stuff With Python',
          comments: [{ text: 'An excellent book'}, { text: 'OMG!'}]
        },
        { title: 'Clean Architecture: A Craftsman\'s Guide to Software Structure and Design' }
      ];
      Book.insertMany(books).then(() => done());
    });

    test('Array of books', done => {
      chai.request(app).get('/api/books').then(res => {
        assert.equal(res.status, 200);
        assert.isArray(res.body);
        assert.equal(res.body.length, 3);
        assert.equal(res.body[1].title, 'Automate The Boring Stuff With Python');
        assert.exists(res.body[1]._id);
        assert.equal(res.body[1].commentcount, 2);
        done();
      })
    });
    
    test('Not found', done => {
      chai.request(app).get('/api').then(res => {
        assert.equal(res.status, 404);
        assert.exists('notfound');
        assert.equal(res.body.notfound, 'resource not found');
        done();
      })
    });

    test('No books stored', done => {
      Book.deleteMany({}).then(() => {});

      chai.request(app).get('/api/books').then(res => {
        assert.equal(res.status, 400);
        assert.exists('nobooks');
        assert.equal(res.body.nobooks, 'no books stored');
        done();
      })
    });
    
  });
  /*  
  suite('DELETE /api/books/:_id => text', () => {
    
    test('No _id', done => {
      
    });
    
    test('Valid _id', done => {
      
    });

    test('Invalid _id', done => {

    });
    
  });

  suite('GET /api/books/:_id => text', () => {
    
    test('No _id', done => {
      
    });
    
    test('Valid _id', done => {
      
    });

    test('Invalid _id', done => {

    });
    
    test('Comment count must be zero', done => {
      chai.request(app).get('/api/books')
    });

  });

  suite('POST /api/books/:_id => text', () => {
    
    test('No _id', done => {
      
    });
    
    test('Valid _id', done => {
      
    });

    test('Invalid _id', done => {

    });
  
  }); 
  */
});