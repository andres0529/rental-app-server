require("dotenv").config();
const express = require("express");
const cors = require("cors"); //npm i cors
const app = express();
const routerApi = require("./routes");
const PORT = process.env.DEV_PORT || 3000;
app.use(express.json());

// Solving the CORS problem, to install with npm use "npm i cors"
const options = {
  origin: (origin, callback) => {
    callback(null, true); // Always allow any origin
  },
};
app.use(cors(options));
routerApi(app);

// Listening PORT
app.listen(PORT, () => {
  console.log("App runing in PORT: " + PORT);
});
