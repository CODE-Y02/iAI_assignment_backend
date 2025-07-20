const errorHandler = (err, req, res, next) => {
  // Determine status code and build response
  const statusCode = err.status || 500;
  const response = {
    success: err.success !== undefined ? err.success : false,
    data: err.data !== undefined ? err.data : null,
    error: "Internal Server Error",
  };

  console.log("ERROR_HANDLER", { err: err.message });

  // Send the error response
  res.status(statusCode).json(response);
};

module.exports = errorHandler;
