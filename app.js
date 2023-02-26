require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const connectDB = require('./db/connect');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
global.session = {};
global.session.userId = null;
var flag = 0;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


// Use session and flash middleware
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.use(flash());

// Use passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set up routes
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));
app.use('/users', require('./routes/users'));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// make pubblic folder static
app.use(express.static('public'));

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();