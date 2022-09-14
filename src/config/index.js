const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  APP_PORT: process.env.APP_PORT || 4200,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/redis-cache',
  REDIS_URI: process.env.MONGO_URI || 'redis://localhost:6379',
};
