const isEmpty = require('./isEmpty');

const commentValidator = data => {
  const { comment } = data;
  let errors = {};

  if (isEmpty(comment)) {
    errors.comment = 'Comment is required';
    return errors;
  }

  return false;
}

module.exports = commentValidator;

