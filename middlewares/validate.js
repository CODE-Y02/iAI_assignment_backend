const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body);

  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    // Create a custom error object to be handled by the global error handler
    const validationError = new Error(errorMessage);
    validationError.statusCode = 400; // Bad Request

    console.log("8797897979797", error);

    return next(validationError);
  }

  return next();
};

module.exports = validate;
