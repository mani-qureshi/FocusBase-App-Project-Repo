
const errorHandler = (err, req, res, next) => {
  // Log the error for the developer
  console.error(err.stack);

  // Default values
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Internal Server Error";

  // Handle specific Mongoose errors (Optional but professional)
  if (err.name === 'CastError') {
      statusCode = 400;
      message = "Invalid Resource ID format";
  }

  res.status(statusCode).json({
      success: false,
      message: message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack, 
  });
};

module.exports = errorHandler;

