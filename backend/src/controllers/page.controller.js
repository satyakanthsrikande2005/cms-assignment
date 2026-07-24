const { StatusCodes } = require("http-status-codes");
const pageService = require("../services/page.service");
const { sendSuccess } = require("../utils/apiResponse.util");
const asyncHandler = require("../utils/asyncHandler.util");

const pageController = {
  createPage: asyncHandler(async (req, res) => {
    const page = await pageService.createPage(req.body, req.user._id);
    return sendSuccess(res, {
      statusCode: StatusCodes.CREATED,
      message: "Page created successfully",
      data: { page },
    });
  }),

  getPages: asyncHandler(async (req, res) => {
    const result = await pageService.getPages(req.query, req.user);
    return sendSuccess(res, {
      message: "Pages retrieved",
      data: result,
    });
  }),

  getPageById: asyncHandler(async (req, res) => {
    const page = await pageService.getPageById(req.params.id);
    return sendSuccess(res, {
      message: "Page retrieved",
      data: { page },
    });
  }),

  updatePage: asyncHandler(async (req, res) => {
    const page = await pageService.updatePage(req.params.id, req.body, req.user);
    return sendSuccess(res, {
      message: "Page updated successfully",
      data: { page },
    });
  }),

  deletePage: asyncHandler(async (req, res) => {
    const result = await pageService.deletePage(req.params.id, req.user);
    return sendSuccess(res, {
      message: result.message,
      data: {},
    });
  }),
};

module.exports = pageController;
