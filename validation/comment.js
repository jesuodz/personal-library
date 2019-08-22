const validator = require('validator');
const isEmpty   = require('./isEmpty');

const validateComment = data => {
  let errors = {};

  data.comment = !isEmpty(data.comment) ? data.comment : '';

  if (validator.isEmpty(data.comment)) {
    errors.comment = 'Comment is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateComment;
