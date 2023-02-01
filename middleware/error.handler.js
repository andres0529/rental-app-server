/* eslint-disable no-unused-vars */
/*
Note: Even if the function is no using NEXT parameter, it is a must, since it is the way that the system detect it as a midddleware of type errors
*/

//Middleware for log errors
function logErrors(err, req, res, next) {
  console.log(err);
  next(err);
}

// Middleware for Detecting the error and create a format to return to the client
function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

module.exports = { logErrors, errorHandler };
