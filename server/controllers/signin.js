const { validate } = require("./validate");

const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }
  const validatedEmail = validate(email);
  const validatedPassword = validate(password);
  db.select("email", "hash")
    .from("login")
    .where("email", "=", validatedEmail)
    .then((data) => {
      const isValid = bcrypt.compareSync(validatedPassword, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch((err) => res.status(400).json("wrong credentials"));
};

module.exports = {
  handleSignin: handleSignin,
};
