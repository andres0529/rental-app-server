require("dotenv").config();
const express = require("express");
const cors = require('cors'); //npm i cors
const app = express();
const routerApi = require("./routes");
const PORT = process.env.DEV_PORT || 3000;
app.use(express.json());

// Solving the CORS problem, to install with npm use "npm i cors"
const whitelist = ['http://127.0.0.1:5500', 'myportfolio.com.co']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true) //first parameters is null if there is not error, and true for is allowed
    } else {
      callback(new Error('FORBIDEN 404'))
    }
  }
}
routerApi(app);
app.use(cors(options));

// Listening PORT
app.listen(PORT, () => {
  console.log("App runing in PORT: " + PORT);
});