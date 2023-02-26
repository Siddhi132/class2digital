const StudentProfile = require('../models/StudentProfile');
const IndustrialProjects = require('../models/industrialProject');
const sellProduct = require('../models/sellProduct');

const Internship = require('../models/internship');
const User = require('../models/user');
const MentorProfile = require('../models/mentorProfile');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const showStudentProfile = async (req, res) => {
    var id = global.session.userId;
    var role = global.session.userRole;





    if (role == "student") {

        console.log('id', id);
        var userDetails = await User.findById(id);

        var internshipData = {};
        var industrialProjectData = {};
        var sellProductData = {};

        if (userDetails.internships.length > 0) {
            for (var i = 0; i < userDetails.internships.length; i++) {
                var internship = await Internship.findById(userDetails.internships[i]);
                internshipData[i] = internship;
            }
        }

        if (userDetails.industrialProjects.length > 0) {
            for (var i = 0; i < userDetails.industrialProjects.length; i++) {
                var industrialProject = await IndustrialProjects.findById(userDetails.industrialProjects[i]);
                industrialProjectData[i] = industrialProject;
            }
        }
        if (userDetails.sellProducts.length > 0) {
            for (var i = 0; i < userDetails.sellProducts.length; i++) {
                var product = await sellProduct.findById(userDetails.sellProducts[i]);
                sellProductData[i] = product;
            }
        }
        // console.log('internshipData', internshipData);
        // ('userDetails', userDetails);
        res.status(200).send({ "user": userDetails, "internshipData": internshipData, "industrialProjectData": industrialProjectData, "sellProductData": sellProductData });
        // res.render('studentProfile', { "user": userDetails });

    }
    else if (role == "mentor") {
        var userDetails = await MentorProfile.findById(id);

        var mentee = {};
        var researchPaper = {};
        var sellProductData = {};

        if (userDetails.mentee.length > 0) {
            for (var i = 0; i < userDetails.mentee.length; i++) {
                // var internship = await Internship.findById(userDetails.internships[i]);
                // internshipData[i] = internship;
            }
        }

        if (userDetails.researchPaper.length > 0) {
            for (var i = 0; i < userDetails.researchPaper.length; i++) {
                // var industrialProject = await IndustrialProjects.findById(userDetails.industrialProjects[i]);
                // industrialProjectData[i] = industrialProject;
            }
        }
        if (userDetails.sellProducts.length > 0) {
            for (var i = 0; i < userDetails.sellProducts.length; i++) {
                var product = await sellProduct.findById(userDetails.sellProducts[i]);
                sellProductData[i] = product;
            }
        }
        res.status(200).send({ "mentor": userDetails, "researchPaper": researchPaper, "mentee": mentee, "sellProductData": sellProductData });

    }





}

const updateStudentProfile = async (req, res) => {
    var id = global.session.userId;
    var role = global.session.userRole;
    try {


        if (role == "student"){
        const newData = {
            name: req.body.name,
            phone: req.body.phone,
            education: req.body.education,
            //subcategory: req.body.subcategory,
            college: req.body.college,
            university: req.body.university,
            branch: req.body.branch,
            stream: req.body.stream,
            semester: req.body.semester,
            // state: req.body.state,
            location: req.body.location,
            resume:req.body.resume
        }
        // console.log('updateFields', updateFields);
        // Check if a user with the same email already exists
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(400).send({ error: 'No user available.' });
        }

        User.findOneAndUpdate({ _id: id }, { $set: newData }, (err, user) => {
            if (err) {
                console.log(err);
            } else {
                // handle success
                console.log("User updated successfully!");
                res.status(200).send({ message: 'User updated successfully.' });
            }
        });

    }
    else if (role == "mentor"){
        const newData = {
            name: req.body.name,
            phone: req.body.phone,
            education: req.body.education,
            location: req.body.location,
            background: req.body.background,
            subcategory: req.body.subcategory,
            AreaOfIntrest: req.body.AreaOfIntrest,
            Specialization: req.body.Specialization,
            college: req.body.college,
            university: req.body.university,
            branch: req.body.branch
        }
        // console.log('updateFields', updateFields);
        // Check if a user with the same email already exists
        const existingUser = await MentorProfile.findById(id);
        if (!existingUser) {
            return res.status(400).send({ error: 'No user available.' });
        }

        MentorProfile.findOneAndUpdate({ _id: id }, { $set: newData }, (err, existingUser) => {
            if (err) {
                console.log(err);
            } else {
                // handle success
                console.log("User updated successfully!");
                res.status(200).send({ message: 'User updated successfully.' });
            }
        });
    }

        // Object.assign(existingUser, updateFields);
        // await existingUser.save();
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error updating user. ' });
    }
}



module.exports = { showStudentProfile, updateStudentProfile };