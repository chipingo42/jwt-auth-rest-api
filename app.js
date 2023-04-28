const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const createError = require('http-errors')
const connectDB = require('./config/db');


const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true}));


const AuthRoute = require('./routes/Auth.route')
const indexFiles = require('./routes/index')

// load the config where the DB URL comes
dotenv.config({ path: './config/config.env'});

// connect DB
connectDB()

// PORT
const PORT = process.dotenv || 5556;

// Routes
app.use('/', indexFiles) // importing index file into app.js
app.get('/',  async (req, res, next) => {
  res.send('Hello express')
});

app.use('/auth', AuthRoute);

app.use(async (req, res, next) => {
  next(createError.NotFound())
});

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
});

app.listen(PORT, () =>  console.log(`Server running on port 5556`))

