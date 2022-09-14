const redis = require('redis');
const config = require('./config');

const client = redis.createClient({
  url: config.REDIS_URI,
});

client.on('error', (error) => {
  console.log(error);
});

module.exports = client;
