const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    education: {
        type: String
    },
 
    subcategory: {
        type: String
    },
    college: {
        type: String
    },
    university: {
        type: String
    },
    branch: {
        type: String
    },
    semester: {
        type: Number
    },
    state: {
        type: String
    },
    location: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    rewardPoints: {
        type: Number,
        default: 0
    }
});

    // password: {
    //   type: String,
    //   required: true
    // },

    const StudentProfile = mongoose.model('StudentProfile', studentSchema);
    module.exports = StudentProfile;