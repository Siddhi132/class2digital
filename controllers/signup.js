const User = require('../models/user');
const Mentor = require('../models/mentorProfile');
const jwt = require('jsonwebtoken');


const verifyUserForSignup =  async (req, res) => {
    try {
      var existingUser;
      var user;
      const { name, email, password } = req.body;

      if (req.body.role == 'student') {
        existingUser = await User.findOne({ email });
      }
      else if (req.body.role == 'mentor') {
        existingUser = await Mentor.findOne({ email });
      }
      // Check if a user with the same email already exists
      if (existingUser) {
        return res.status(400).send({ error: 'A user with this email already exists.' });
      }
      // Create a new user
      
      if (req.body.role == 'student') {
        user = new User(req.body);
      }
      else if (req.body.role == 'mentor') {
        user = new Mentor(req.body);
      }

      console.log(user);
      // Save the user to the database
      await user.save();
      // Respond with a success message
      res.status(200).send({ message: 'User created successfully.' });
    } catch (error) {
      console.log("error this is ", error);

      res.status(500).send({ error: 'Error creating user. ' });
    }
  }


  //verify token

const verifyDashboardToken = (req, res, next) => {
    // Get the auth header value
    // console.log('req.headers', req.headers.cookie);
    // console.log('req.cookies', req.headers.cookie.split(';')[2].split('=')[1]);
    // console.log('req.cookies', req.cookie['auth-token']);
    // console.log('req.header ', req.headers);
    
    var bearerHeader = global.session.token;
    // console.log('bearerHeader', bearerHeader);
    // console.log('bearerHeaderLen', bearerHeader.length);
    for (let i = 0; i < bearerHeader.length; i++) {
      if (bearerHeader[i].includes('token')) {
        // console.log('bearerHeader[i]', bearerHeader[i]);
        bearerHeader = bearerHeader[i].split('=')[1];
        // console.log('bearerHeader', bearerHeader);
      }
    }
    // const bearerHeader = req.cookie['auth-token'];
  
    // const bearerHeader = localstorage.getItem('token');
    // Check if bearer is undefined
    // console.log('bearerHeader', bearerHeader);
  
    if (typeof bearerHeader !== 'undefined') {
      // Split at the space
      // const bearer = bearerHeader.split(' ');
      // Get token from array
      // const bearerToken = bearer[1];
      // Set the token
      // req.token = bearerToken;
      // Next middleware
      // jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
      jwt.verify(bearerHeader, process.env.JWT_SECRET, (err, authData) => {
        if (err) {
          console.log('err', err);
  
          res.sendStatus(403);
        } else {
          console.log('authData', authData);
          User.findById(authData._id).then(user => {
            if (!user) return res.status(404).send({ error: "User not found" })
            // console.log('user', user);
            req.user = user;
            // console.log('req.user', req.user);
            
            next();
          }).catch(err => res.status(400).send(err))
          // req.user = authData;
  
          // next();
        }
      });
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  }
  

  module.exports = {verifyUserForSignup, verifyDashboardToken};