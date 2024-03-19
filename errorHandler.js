const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    res.status(500).send('Internal Server Error'); // Send a generic error response
  };
  
  module.exports = errorHandler;
  