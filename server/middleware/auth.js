const redisClient = require("./redis");

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send("Unauthorized");
  }
  const token = authorization.split(" ")[1];
  return redisClient.get(token, (err, reply) => {
    if (err || !reply) {
      return res.status(401).send("Unauthorized");
    }
    return next();
  });
};

module.exports = {
  requireAuth,
};
