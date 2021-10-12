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
    return { success: "true", userId: id, token };
  } catch (message) {
    return console.log(message);
  }
};

const handleRegister = (db, bcrypt) => (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }
  const validatedEmail = validate(email);
  const validatedName = validate(name);
  const validatedPassword = validate(password);
  const hash = bcrypt.hashSync(validatedPassword);
  db.transaction((trx) => {
    return trx
      .insert({
        hash: hash,
        email: validatedEmail,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            name: validatedName,
            joined: new Date(),
          })
          .then((user) => user[0]);
      })
      .then(trx.commit)
      .catch(trx.rollback);
  })
    .then((data) => {
      return data.id && data.email
        ? createSession(data)
        : Promise.reject("invalid credentials");
    })
    .then((session) => res.json(session))
    .catch((err) => res.status(400).json("unable to register"));
};

module.exports = {
  handleRegister: handleRegister,
};
