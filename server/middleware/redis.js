const redis = require("redis");

const redisClient = redis.createClient(process.env.REDIS_URI);

module.exports = redisClient;
