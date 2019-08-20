'use strict';

const express     = require('express');
const mongoose    = require('mongoose');
const bodyParser  = require('body-parser');
const helmet      = require('helmet');
const path        = require('path');
const app         = express();
const config      = require('./config')();
const testRunner  = require('./test-runner');
const booksRoute  = require('./routes/api');
// Configuration
app.use(helmet(config.SECURITY));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(config.MONGO_URI, config.OPTIONS)
  .then(() => console.log(`...Connected to MongoDB at ${config.MONGO_URI}...`))
  .catch(err => console.log(err));

app.use('/api/books', booksRoute);

if (config.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

app.listen(config.PORT, () => {
  console.log(`...Listening on port ${config.PORT}...`);

  if (process.env.NODE_ENV === 'test') {
    console.log('Running tests...');
    setTimeout(() => {
      try {
        testRunner.run();
      } catch(error) {
        console.log('Test are not valid:', error);
      }
    }, 1500);
  }

  console.log(`...Running server on ${config.NODE_ENV} mode...`);
});

module.exports = app;
