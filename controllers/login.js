const User = require('../models/user');
const Mentor = require('../models/mentorProfile');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const verifyUserForLogin = async (req, res) => {

  var user;
  console.log('req.body', req.body);

  try {
    const { email, password } = req.body;
    var role = req.body.role;

    // Find the user by email

    if (role == "mentor") {

      user = await Mentor.findOne({ email });
    }

    else if (role == "student"){

      user = await User.findOne({ email });
    }
    else {
      user = await User.findOne({ email });
    }

    console.log('user', user);

    // If no user is found with this email, return an error
    if (!user) {
      console.log('user not found');
      return res.status(401).send({ error: 'Invalid email or password.' });
    }
    // Compare the password with the hashed password in the database
    console.log('password', password);
    console.log('user.password', user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('isMatch', isMatch);
    // If the password does not match, return an error
    if (!isMatch) {
      console.log('password does not match');
      return res.status(401).send({ error: 'Invalid email or password.' });
    }
    console.log('password matches');

    // If the email and password match, generate a JSON web token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    console.log('token', token);


    // set token in the sessionStorage
    // Send the token in the response
    // res.cookie('token', token, { httpOnly: true });
    // res.cookie('auth-token', token, { maxAge: 900000, httpOnly: true });
    console.log('res.cookie', req.headers);
    global.session.token = token;
    global.session.userId = user._id;
    global.session.userMail = user.email;
    global.session.userRole = user.role;
    console.log('global.session.userId', global.session.userId);
    console.log('global.session.userMail', global.session.userMail);

    // res.send({ message: 'Logged in successfully.' });
    res.send({ "user": user });


  } catch (error) {
    console.log('error', error);

    res.status(500).send({ error: 'Error logging in.' });
  }
};



module.exports = { verifyUserForLogin };