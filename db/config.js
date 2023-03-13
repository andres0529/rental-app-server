if (process.env.NODE_ENV != 'production') {
    require("dotenv").config();
}
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const uri = process.env.URI_STRING;

const connection = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 30000 });
  connection.then ((res)=> {
    console.log('Connected to MongoDB');
}).catch(() => {
    console.log('Connection to MongoDB Failed');
});



module.exports = connection;

