require('dotenv').config();

// use mongo url from env file

const uri = process.env.MONGO_URI;
const mongoose = require('mongoose');

const connectDB = () => {
    return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = connectDB;