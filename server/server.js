const express = require("express");
const bcrypt = require('bcryptjs');
const cors = require("cors");
const knex = require("knex");
const morgan = require("morgan");

if (process.env.NODE_ENV !== "production")
  require("dotenv").config({ path: "../.env" });

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require("./controllers/image");
const auth = require('./controllers/auth');

//Database Setup
const db = knex({
  client: "pg",
  // Dockerized
  // connection: process.env.POSTGRES_URI
  connection: {
    host: "127.0.0.1",
    user: "gbakshi",
    password: "",
    database: "metaface",
  },
});

const app = express();
const port = process.env.PORT || 3001;

const whitelist = ["http://localhost:3000"];
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
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.post('/signin', signin.signinAuthentication(db, bcrypt))
// app.post('/register', register.handleRegister( db, bcrypt) )
// app.get('/profile/:id', auth.requireAuth, profile.handleProfileGet(db))
// app.post('/profile/:id', auth.requireAuth, profile.handleProfileUpdate( db) )
// app.put('/image', auth.requireAuth, image.handleImage(db))
// app.post('/imageurl', auth.requireAuth, image.handleApiCall)

app.get('/', (req, res) => { res.send("success") })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post("/register", register.handleRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(db))
app.put("/image", image.handleImage(db));
app.post("/imageurl", image.handleApiCall);

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});
