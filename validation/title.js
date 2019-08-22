const isEmpty = require('./isEmpty');

const titleValidator = data => {
  const { title } = data;
  let errors = {};

  if (isEmpty(title)) {
    errors.title = 'no title sent'
    return errors;
  }

  return false;
}

module.exports = titleValidator;
