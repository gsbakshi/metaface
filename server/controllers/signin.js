const jwt = require("jsonwebtoken");

const redisClient = require("../middleware/redis");
const { validate } = require("../middleware/validate");

const signToken = (username) => {
  const jwtPayload = { username };
  return jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: "2 days" });
};

const setToken = (key, value) => Promise.resolve(redisClient.set(key, value));

// TODO fix promise with resolve and reject
// const setToken = (key, value) => (resolve, reject) => {
//   redisClient.set(key, value, (error, result) => {
//     if (error) {
//       reject(error);
//     }
//     resolve(result);
//   });
// };

const createSession = async (user) => {
  const { email, id } = user;
  const token = signToken(email);
  try {
    setToken(token, id);
    return { success: "true", userId: id, token};
  } catch (message) {
    return console.log(message);
  }
};

const handleSignin = (db, bcrypt, req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject("incorrect form submission");
  }
  const validatedEmail = validate(email);
  const validatedPassword = validate(password);
  return db
    .select("email", "hash")
    .from("login")
    .where("email", "=", validatedEmail)
    .then((data) => {
      const isValid = bcrypt.compareSync(validatedPassword, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => user[0])
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        return Promise.reject("wrong credentials");
      }
    })
    .catch((error) => error);
};

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send("Unauthorized");
  }
  const token = authorization.split(" ")[1];
  return redisClient.get(token, (error, reply) => {
    if (error || !reply) {
      return res.status(401).send("Unauthorized");
    }
    return res.json({ id: reply });
  });
};

const signinAuthentication = (db, bcrypt) => (req, res) => {
  const { authorization } = req.headers;
  return authorization
    ? getAuthTokenId(req, res)
    : handleSignin(db, bcrypt, req, res)
        .then((data) => {
          return data.id && data.email
            ? createSession(data)
            : Promise.reject("invalid credentials");
        })
        .then((session) => res.json(session))
        .catch((error) => res.status(400).json(error));
};

module.exports = {
  signinAuthentication: signinAuthentication,
};
