require("dotenv").config();
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);


const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB connection established successfully");
});


module.exports = connection;
