

const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { json } = require('body-parser');
const {verifyUserForLogin} = require('../controllers/login');
const { verifyUserForSignup, verifyDashboardToken } = require('../controllers/signup');
const { showStudentProfile, updateStudentProfile } = require('../controllers/studentProfile');

const { addInternship , getInternship, Getuniquecategory} = require('../controllers/addinternship');


// Home page
router.get('/', (req, res) => {
  console.log("global.session", global.session.userId);
  if (global.session.userId == null) {
    flag = 0;
    res.render('index', {flag});
  } 
  else {
    flag = 1;
    var role = global.session.userRole;
    console.log("role", role);
    res.render('index', {flag, role});
  }


});




// internship page 
router.get('/Addinternship', (req, res) => {
  res.render('Addinternship');
});

// router.route("/Addinternshipsuccess").post(addInternship);
// router.post("/Addinternshipsuccess", addInternship);
// axios post
router.post('/Addinternship', (req, res) => {
  // Code to fetch data from the API goes here
  req.body.companyId = global.session.userId;
  axios.post('http://localhost:3000/api/Addinternship',req.body)
    .then((response) => {
      res.render('Addinternship', {"message": response.data});
    })
    .catch((error) => {
      console.log(error);
    });
});


router.get("/Allinternship",(req,res)=>{
  axios.get('http://localhost:3000/api/Allinternship',req.query)
  .then((response) => {
    res.render('Allinternship', {"internship": response.data});
  })
  .catch((error) => {
    console.log(error);
  });
});


// Login page
router.get('/login', (req, res) => {
  
  res.render('login');
});


// router.route("/login").post(verifyUserForLogin);
router.post('/login', (req, res) => {
  // Code to fetch data from the API goes here
  axios.post('http://localhost:3000/api/login', req.body)
    .then((response) => {
      flag = 1;
      console.log('response.data', response.data);
      // global.session.userId = response.data.userId;
      // console.log("response.data.userId", response.data.userId);
      // res.render('index', {"user": response.data});
      res.redirect('/');
      
    })
    .catch((error) => {
      console.log(error);
    });

    
});


// Profile page

router.get('/profile', (req, res) => {
  // Code to fetch data from the API goes here
  axios.get('http://localhost:3000/api/studentProfile')
    .then((response) => {
      console.log('response.data.profile', response.data);
      var role = global.session.userRole;
      flag = 1;
      res.render('profile', {"user": response.data, role});
  })
    .catch((error) => {
      console.log(error);
    });
});

// router.route('/profile').post(updateStudentProfile);
router.post('/profile', (req, res) => {
  // Code to fetch data from the API goes here
  axios.post('http://localhost:3000/api/studentProfile', req.body)
    .then((response) => {
      res.redirect('/profile');
      
  })
    .catch((error) => {
      console.log(error);
    });
});



// Signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res) => {
  // Code to fetch data from the API goes here
  axios.post('http://localhost:3000/api/signup', req.body)
    .then((response) => {
      res.redirect('/login');

    })
    .catch((error) => {
      console.log(error);
    });
});


// logout page
router.get('/logout', (req, res) => {
  global.session = {};
  res.redirect('/login');
});



// // Dashboard page
router.get('/dashboard', (req, res) => {
  // Code to fetch data from the API goes here
  axios.get('http://localhost:3000/api/dashboard')
    .then((response) => {
      res.render('dashboard', {"user": response.data});

    })
    .catch((error) => {
      console.log(error);
    });
});

// product get route
router.get('/getProducts', (req, res) => {
  // Code to fetch data from the API goes here
  axios.get('http://localhost:3000/api/getProducts')
    .then((response) => {
      if (global.session.userId == null) {
        flag = 0;
        res.render('index', {flag});
      } 
      else {
        flag = 1;
        var role = global.session.userRole;
        console.log("role", role);
      res.render('products', {"products": response.data.products, flag, role});
      }
    })
    .catch((error) => {
      console.log(error);
    });
});


// upload project repository
router.get('/uploadProjectRepository', (req, res) => {
  res.render('uploadProjectRepository');
});


router.post('/uploadProjectRepository', (req, res) => {
  // Code to fetch data from the API goes here
  axios.post('http://localhost:3000/api/uploadProjectRepository', req.body)

    .then((response) => {
      res.redirect('/getProjectRepository');
    })
    .catch((error) => {
      console.log(error);
    });
});

// upload project repository
router.get('/ProjectRepository', (req, res) => {
  flag = 1;
  var role = global.session.userRole;
  console.log("req.query.prj", req.query);
  axios.get('http://localhost:3000/api/getProjectRepository?_id='+req.query._id, req.query)
  .then((response) => {
    flag = 1;
    var role = global.session.userRole;
    res.render('projectRepository', {"repository": response.data.ProjectRepository, flag, role});
  })
  .catch((error) => {
    console.log(error);
  });
});


router.get("/getProjectRepository",(req,res)=>{
  axios.get('http://localhost:3000/api/getProjectRepository',req.query)
  .then((response) => {
    flag = 1;
    var role = global.session.userRole;
    res.render('projectRepositories', {"repository": response.data.ProjectRepository, flag, role});
  })
  .catch((error) => {
    console.log(error);
  });
});

router.get('/getMentors', (req, res) => {
  // Code to fetch data from the API goes here
  axios.get('http://localhost:3000/api/getMentors')
    .then((response) => {
      if (global.session.userId == null) {
        flag = 0;
        res.render('index', {flag});
      }
      else {
        flag = 1;
        var role = global.session.userRole;
        console.log("role", role);
      res.render('mentors', {"mentors": response.data.mentors, flag, role});
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
router.get('/getMentorDetails', (req, res) => {
  // Code to fetch data from the API goes here
  axios.get('http://localhost:3000/api/getMentors?_id='+req.query._id, req.query)
    .then((response) => {
      if (global.session.userId == null) {
        flag = 0;
        res.render('index', {flag});
      }
      else {
        flag = 1;
        var role = global.session.userRole;
        console.log("role", role);
      res.render('mentorDetails', {"mentor": response.data.mentors, flag, role});
      }
    })
    .catch((error) => {
      console.log(error);
    });
});


// About us 

router.get('/aboutus', (req, res) => {
  res.render('AboutUs');
});




//idp page

router.get('/AddIdp', (req, res) => {
  res.render('AddIdp');
});




router.post('/AddIdp', (req, res) => {
  // Code to fetch data from the API goes here
  req.body.companyId = global.session.userId;
  axios.post('http://localhost:3000/api/AddIdp',req.body)
    .then((response) => {
      res.render('AddIdp', {"message": response.data});
    })
    .catch((error) => {
      console.log(error);
    });
});





router.get("/AllIdp",(req,res)=>{
  axios.get('http://localhost:3000/api/AllIdp',req.query)
  .then((response) => {
    res.render('Allidp', {"idp": response.data});
  })
  .catch((error) => {
    console.log(error);
  });
});


// router of internshipDetail page
router.get("/internshipDetail",(req,res)=>{
  console.log("hyyy",req.query);
  axios.get('http://localhost:3000/api/internshipDetail?id='+req.query.id)
  
  .then((response) => {
    // console.log("response.data",response.data);
    res.render('internshipDetail',{"specInternship": response.data,"userid":global.session.userId});
  })
  .catch((error) => {
    console.log(error);
  });
}
);


router.get("/idpDetail",(req,res)=>{
  console.log("hyyy",req.query);
  axios.get('http://localhost:3000/api/idpDetail?id='+req.query.id)
  .then((response) => {
    // console.log("response.data",response.data);
    res.render('idpDetail',{"specidp": response.data,"userid":global.session.userId});
  })
  .catch((error) => {
    console.log(error);
  });
}
);




module.exports = router;
