const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  APP_PORT: process.env.APP_PORT || 4000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017',
  REDIS_URI: process.env.MONGO_URI || 'redis://localhost:6379',
};
