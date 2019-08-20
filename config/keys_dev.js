module.exports = {
  MONGO_URI: 'mongodb://localhost:27017/personallibrary_dev',
  OPTIONS: {
    keepAlive: 1,
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
};
