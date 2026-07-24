const sendSuccess = (res, { statusCode = 200, message = "", data = {} } = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const sendFailure = (
  res,
  { statusCode = 500, message = "Something went wrong", errors = [] } = {}
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

module.exports = { sendSuccess, sendFailure };
