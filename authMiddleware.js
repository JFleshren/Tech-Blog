exports.isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      // User is authenticated
      next();
    } else {
      // User is not authenticated
      res.redirect('/signin');
    }
  };
  
  // Middleware function to check if the user is an admin
  exports.isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.isAdmin) {
      // User is an admin
      next();
    } else {
      // User is not an admin
      res.status(403).send('Forbidden');
    }
  };
  