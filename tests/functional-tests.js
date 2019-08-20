const chaiHttp  = require('chai-http');
const chai      = require('chai');
const assert    = chai.assert;
const app       = require('../app');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  
    suite('POST /api/books/{project} => object with issue data', () => {
      
      test('Every field filled in', done => {
        
      });
      
      test('Required fields filled in', done => {
        
      });
      
      test('Missing required fields', done => {
        
      });
      
    });
    
    suite('PUT /api/books/{project} => text', () => {
      
      test('No body', done => {
        
      });
      
      test('One field to update', done => {
        
      });
      
      test('Multiple fields to update', done => {
        
      });
      
    });
    
    suite('GET /api/books/{project} => Array of objects with issue data', () => {
      
      test('No filter', done => {
        
        });
      
      test('One filter', done => {
        
      });
      
      test('Multiple filters', done => {
        
      });
      
    });
    
    suite('DELETE /api/books/{project} => text', () => {
      
      test('No _id', done => {
        
      });
      
      test('Valid _id', done => {
        
      });
      
    });

});