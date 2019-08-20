const chaiHttp  = require('chai-http');
const chai      = require('chai');
const assert    = chai.assert;
const app       = require('../app');

chai.use(chaiHttp);

suite('Functional Tests', () => {

    test('Return {msg: \'Test Works\'}', () => {
      chai
        .request(app)
        .get('/api/books/test')
        .then( res => {
          assert.equal(res.status, 200);
          assert.exists(res.body.msg);
          assert.equal(res.body.msg, 'Test works');
        })
    })

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
      
      // test('Required fields filled in', done => {
        
      // });
      
      // test('Missing required fields', done => {
        
      // });
      
    });
    
    // suite('PUT /api/books/{project} => text', () => {
      
    //   test('No body', done => {
        
    //   });
      
    //   test('One field to update', done => {
        
    //   });
      
    //   test('Multiple fields to update', done => {
        
    //   });
      
    // });
    
    // suite('GET /api/books/{project} => Array of objects with issue data', () => {
      
    //   test('No filter', done => {
        
    //     });
      
    //   test('One filter', done => {
        
    //   });
      
    //   test('Multiple filters', done => {
        
    //   });
      
    // });
    
    // suite('DELETE /api/books/{project} => text', () => {
      
    //   test('No _id', done => {
        
    //   });
      
    //   test('Valid _id', done => {
        
    //   });
      
    // });

});