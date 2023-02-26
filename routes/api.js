

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { json } = require('body-parser');
const {verifyUserForLogin} = require('../controllers/login');
const { verifyUserForSignup, verifyDashboardToken } = require('../controllers/signup');
const { showStudentProfile, updateStudentProfile } = require('../controllers/studentProfile');

const {GetspecinternshipDetail, addInternship , getInternship , Getuniquecategory,Getuniquelocation, applyForInternship} = require('../controllers/addinternship');
// const { uploadIndustrialProject , getIndustrialProjects, applyForIndustrialProject} = require('../controllers/IndustrialProject');

const {applyForIndustrialProject, addIdp ,getIdp, Getuniquecategoryidp, Getuniquelocationidp,GetspecidpDetail} = require('../controllers/Idp');
const { uploadProjectRepository, getProjectRepository} = require('../controllers/projectRepository');
const { sellproduct, getProducts , setSold} = require('../controllers/sellproduct');
const { getMentors } = require('../controllers/mentors');
router.get('/getMentors', getMentors);

router.get('/ProjectRepository', getProjectRepository);



router.route("/login").post(verifyUserForLogin);



// Signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.route("/signup").post(verifyUserForSignup);


// logout page
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  req.session.destroy(err => {
    if (err) {
        console.log(err);
    } else {
        res.redirect('/');
    }});
  res.send("user logged out successfully");
  
});



// Dashboard page
router.get('/dashboard', verifyDashboardToken, (req, res) => {
  console.log('req.user.main', req.user);
  res.send(req.user);;
  // res.redirect('/dashboard');
});


router.route('/studentProfile').get(showStudentProfile);


router.route('/studentProfile').post(updateStudentProfile);


// internship page 
// router.get('/Addinternship', (req, res) => {
//   res.render('Addinternship');
// });

// router.route("/Addinternshipsuccess").post(addInternship);
router.post("/Addinternship", addInternship);
router.get("/Allinternship", getInternship);


router.post("/AddIdp", addIdp);
router.get("/AllIdp",getIdp);

// unique category of index get 
router.get("/uniquecategory", Getuniquecategory);

router.get("/uniquecategoryidp", Getuniquecategoryidp);

// unique location of index get
router.get("/uniquelocation", Getuniquelocation);

// uniquelocationidp
router.get("/uniquelocationidp", Getuniquelocationidp);


router.get("/internshipDetail",GetspecinternshipDetail);

router.get("/idpDetail",GetspecidpDetail);

// Apply for Internship
router.post('/applyForInternship', applyForInternship);
router.post('/applyForIndustrialProject', applyForIndustrialProject);


// Fetch Industrial Project..

// router.get('/uploadIndustrialProject', (req, res) => {
//   res.render('uploadIndustrialProject');
// });

// // upload Industrial Project..
// router.post('/uploadIndustrialProject',uploadIndustrialProject);

// // get Industrial Project..
// router.get('/getIndustrialProjects',getIndustrialProjects);


// // Apply for Industrial Project..
// router.post('/applyForIndustrialProject', applyForIndustrialProject);




// upload Project Repository..
// router.get('/uploadProjectRepository', (req, res) => {
//   res.render('uploadProjectRepository');
// });

// upload Project Repository..
router.post('/uploadProjectRepository',uploadProjectRepository);

// get Project Repository..
router.get('/getProjectRepository',getProjectRepository);


// sell product form 
router.get('/sellproduct', (req, res) => {
  res.render('sellproduct');
});

// sell product submit
router.post('/sellproduct', sellproduct);
router.get('/getProducts', getProducts);

// set product which is sold
router.post('/setSold', setSold);
module.exports = router;
