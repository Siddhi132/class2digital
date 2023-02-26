const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true
  },
  
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  education: {
    type: String
  },
  stream: {
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
  },
  internships: [{
    type:Array,
    
  }],
  industrialProjects: [{
    type:Array,
    
  }],

  sellProducts: [{
    type:Array,
  }],

  resume: {
    type: String
  }

  
});

// Hash the password before saving the user to the database
userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

// Compare the entered password with the hashed password in the database
userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error(err);
  }
}

const User = mongoose.model('User', userSchema);

module.exports = User;
