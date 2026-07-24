const { StatusCodes } = require("http-status-codes");
const userService = require("../services/user.service");
const { sendSuccess } = require("../utils/apiResponse.util");
const asyncHandler = require("../utils/asyncHandler.util");

const userController = {
  createUser: asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body);
    return sendSuccess(res, {
      statusCode: StatusCodes.CREATED,
      message: "User created successfully",
      data: { user },
    });
  }),

  getUsers: asyncHandler(async (req, res) => {
    const result = await userService.getUsers(req.query);
    return sendSuccess(res, {
      message: "Users retrieved",
      data: result,
    });
  }),

  getUserById: asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    return sendSuccess(res, {
      message: "User retrieved",
      data: { user },
    });
  }),

  updateUser: asyncHandler(async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body, req.user);
    return sendSuccess(res, {
      message: "User updated successfully",
      data: { user },
    });
  }),

  deleteUser: asyncHandler(async (req, res) => {
    const result = await userService.deleteUser(req.params.id, req.user._id);
    return sendSuccess(res, {
      message: result.message,
      data: {},
    });
  }),
};

module.exports = userController;
