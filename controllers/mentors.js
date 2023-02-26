const User = require('../models/user');
const Mentors = require('../models/mentorProfile');


const getMentors = async (req, res) => {
  if (req.query != null) {
    console.log('req.query', req.query);
    const val = await Mentors.find(req.query);
    // console.log('val', val);
    res.send({ 'mentors': val });
  }
  else {
    // console.log(req.query);

    const val = await Mentors.find();
    // console.log('val', val);
    res.send({ 'mentors': val });
  }
}







module.exports = { getMentors};