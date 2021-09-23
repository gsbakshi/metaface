const express = require("express");
// const bcrypt = require('bcrypt-nodejs');
const cors = require("cors");
const knex = require("knex");
const morgan = require("morgan");

if (process.env.NODE_ENV !== "production")
  require("dotenv").config({ path: "../.env" });

// const register = require('./controllers/register');
// const signin = require('./controllers/signin');
// const profile = require('./controllers/profile');
const image = require("./controllers/image");
// const auth = require('./controllers/authorization');

//Database Setup
const db = knex({
  client: "pg",
  // Dockerized
  // connection: process.env.POSTGRES_URI
  connection: {
    host: "127.0.0.1",
    user: "gb",
    password: "",
    database: "metaface",
  },
});

const database = {
  users: [
    {
      id: "123",
      name: "John",
      email: "john@xyz.com",
      password: "111",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Mon",
      email: "mon@xyz.com",
      password: "111",
      entries: 0,
      joined: new Date(),
    },
  ],
};

const app = express();
const port = process.env.PORT || 3001;

const whitelist = ["http://localhost:3000", "http://localhost:5191"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(morgan("combined"));
// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.post('/signin', signin.signinAuthentication(db, bcrypt))
// app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
// app.get('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileGet(req, res, db) })
// app.post('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileUpdate(req, res, db) })
// app.put('/image', auth.requireAuth, (req, res) => { image.handleImage(req, res, db) })
// app.post('/imageurl', auth.requireAuth, (req, res) => { image.handleApiCall(req, res) })

app.get("/", (req, res) => {
  res.send("working");
});
app.post("/signin", (req, res) => {
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("error logging in");
  }
});

// app.get('/', (req, res) => { res.send(db.users) })
// app.post('/signin', signin.handleSignin(db, bcrypt))
// app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
// app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

app.put("/image", (req, res) => image.handleImage(req, res, db));

app.post("/imageurl", (req, res) => image.handleApiCall(req, res));

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});
