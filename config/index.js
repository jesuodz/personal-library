const env = process.env.NODE_ENV || 'development';

let dbKeys;
if (env == 'production') {
  try {
    dbKeys = require('./keys_prod');
  } catch(err) {
    console.log(`${err}`);
    process.exit(1);
  }
} else {
  dbKeys = require('./keys_dev');
}

const config = () => {
  return {
    NODE_ENV: env,
    PORT: process.env.PORT || 5000,
    ...dbKeys
  }
};

module.exports = config;
