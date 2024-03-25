const authMiddleware = {
  isAuthenticated: (req, res, next) => {
    try {
      if (req.session.user) {
        // User is authenticated
        next();
      } else {
        // User is not authenticated
        res.redirect('/signin');
      }
    } catch (error) {
      console.error('Error in isAuthenticated middleware:', error);
      res.status(500).send('Internal Server Error');
    }
  },
  
  // Middleware function to check if the user is an admin
  isAdmin: (req, res, next) => {
    try {
      if (req.session.user && req.session.user.isAdmin) {
        // User is an admin
        next();
      } else {
        // User is not an admin
        res.status(403).send('Forbidden');
      }
    } catch (error) {
      console.error('Error in isAdmin middleware:', error);
      res.status(500).send('Internal Server Error');
    }
  }
};

module.exports = authMiddleware;
