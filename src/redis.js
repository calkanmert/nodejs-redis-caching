const redis = require('redis');
const config = require('./config');

const client = redis.createClient({
  url: config.REDIS_URI,
});

client.on('connect', () => {
  console.log('Redis Database connected');
})(async () => {
  await client.connect();
})();

module.exports = client;
