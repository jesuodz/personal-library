# Personal Library

## Getting started

### Prerequisites
You will need to create a `keys_dev.js` file in the config folder as:
```
module.exports = {
  mongoURI: 'YOUR_OWN_MONGO_URI'
}
```

### Installation

```
# Clone the repository
git clone https://github.com/jesuodz/personal-library.git

# Cd and install dependencies for server
cd personal-library && npm install

# Install dependencies for client
npm run client-install

# Run both client and server
npm run dev

# Run server only
npm run server

# Run client only
npm run client
```

Server runs on `http://localhost:5000` and client runs on `http://localhost:3000`

## Author
Jesús Ordosgoitty [jesuodz](https://jesuodz.github.io) | [Twitter](https://twitter.com/jesuodz)

## License

[MIT](./LICENSE)

## Acknowledgments

* Inspired by [DevConnector](https://github.com/bradtraversy/devconnector)
