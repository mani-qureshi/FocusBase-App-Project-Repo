
const authorize = (...roles) => {
  return (req, res, next) => {
      // req.user was set by our 'protect' middleware.
      if (!roles.includes(req.user.role)) {
          return res.status(403).json({
              success: false,
              message: `User role ${req.user.role} is not authorized to access this route`
          });
      }
      next();
  };
};

module.exports = { authorize };


