const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

const users = require('./routes/api/users');
const test = require('./routes/api/test');
const location = require('./routes/api/location');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config URI
const db = require('./config/keys').mongoURI;
//Connect to Mongo DB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDb Connected'))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//Routes
app.use('/api/users', users);
app.use('/api/demo', test);
app.use('/api/location', location);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
