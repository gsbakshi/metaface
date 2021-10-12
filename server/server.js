const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const knex = require("knex");
const morgan = require("morgan");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const auth = require("./middleware/auth");

const db = knex({
  client: "pg",
  connection: process.env.POSTGRES_URI,
});

const app = express();
const port = process.env.PORT;

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(morgan("combined"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
  res.send("success");
});

app.post("/signin", signin.signinAuthentication(db, bcrypt));
app.post("/register", register.handleRegister(db, bcrypt));
app.get("/profile/:id", auth.requireAuth, profile.handleProfileGet(db));
app.post('/profile/:id', auth.requireAuth, profile.handleProfileUpdate( db) )
app.put("/image", auth.requireAuth, image.handleImage(db));
app.post("/imageurl", auth.requireAuth, image.handleApiCall);

app.get("/healthcheck", (req, res) => {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.send("Healthy");
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});

async function closeGracefully(signal) {
  console.log(`*^!@4=> Received signal to terminate: ${signal}`);
  app.removeAllListeners();
  process.exit();
}
process.on("SIGINT", closeGracefully);
process.on("SIGTERM", closeGracefully);
