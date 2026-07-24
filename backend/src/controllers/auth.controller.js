const { StatusCodes } = require("http-status-codes");
const authService = require("../services/auth.service");
const { sendSuccess } = require("../utils/apiResponse.util");
const asyncHandler = require("../utils/asyncHandler.util");

const authController = {
  login: asyncHandler(async (req, res) => {
    const result = await authService.login(req.body);
    return sendSuccess(res, {
      statusCode: StatusCodes.OK,
      message: "Login successful",
      data: result,
    });
  }),

  getProfile: asyncHandler(async (req, res) => {
    const user = await authService.getProfile(req.user._id);
    return sendSuccess(res, {
      message: "Profile retrieved",
      data: { user },
    });
  }),

  changePassword: asyncHandler(async (req, res) => {
    const result = await authService.changePassword(req.user._id, req.body);
    return sendSuccess(res, {
      message: result.message,
      data: {},
    });
  }),
};

module.exports = authController;
