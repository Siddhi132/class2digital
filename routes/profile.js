const express = require('express');
const router = express.Router();
const { showStudentProfile, updateStudentProfile } = require('../controllers/studentProfile');


// router.route('/studentProfile').get(showStudentProfile);
// const studentProfile = {
//     name: "John Doe",
//     role: "student",
//     email: "johndoe@example.com",
//     phone: "123-456-7890",
//     education: "Bachelors",
//     subcategory: "Computer Science",
//     college: "XYZ College",
//     university: "ABC University",
//     branch: "CSE",
//     semester: 3,
//     state: "California",
//     location: "San Francisco"
// };
router.get('/', (req, res) => {
    res.render('studentProfile');
  });

router.route('/studentProfile').post(updateStudentProfile);


module.exports = router;