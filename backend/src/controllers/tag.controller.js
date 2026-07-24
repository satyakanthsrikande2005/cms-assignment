const { StatusCodes } = require("http-status-codes");
const tagService = require("../services/tag.service");
const { sendSuccess } = require("../utils/apiResponse.util");
const asyncHandler = require("../utils/asyncHandler.util");

const tagController = {
  createTag: asyncHandler(async (req, res) => {
    const tag = await tagService.createTag(req.body);
    return sendSuccess(res, {
      statusCode: StatusCodes.CREATED,
      message: "Tag created successfully",
      data: { tag },
    });
  }),

  getTags: asyncHandler(async (req, res) => {
    const result = await tagService.getTags(req.query);
    return sendSuccess(res, {
      message: "Tags retrieved",
      data: result,
    });
  }),

  getTagById: asyncHandler(async (req, res) => {
    const tag = await tagService.getTagById(req.params.id);
    return sendSuccess(res, {
      message: "Tag retrieved",
      data: { tag },
    });
  }),

  updateTag: asyncHandler(async (req, res) => {
    const tag = await tagService.updateTag(req.params.id, req.body);
    return sendSuccess(res, {
      message: "Tag updated successfully",
      data: { tag },
    });
  }),

  deleteTag: asyncHandler(async (req, res) => {
    const result = await tagService.deleteTag(req.params.id);
    return sendSuccess(res, {
      message: result.message,
      data: {},
    });
  }),
};

module.exports = tagController;
