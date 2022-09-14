const mongoose = require('mongoose');
const config = require('./config');

mongoose.connection.on('connected', () => {
  console.log('mongoose connected');
});

module.exports = () => {
  mongoose.connect(config.MONGO_URI);
};
