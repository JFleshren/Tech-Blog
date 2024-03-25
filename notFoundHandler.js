const notFoundHandler = (req, res, next) => {
    res.status(404).send("Sorry, the page you're looking for does not exist.");
  };
  
  module.exports = notFoundHandler;