const searchService = require("../services/search.service");
const { sendSuccess } = require("../utils/apiResponse.util");
const asyncHandler = require("../utils/asyncHandler.util");

const searchController = {
  publicSearch: asyncHandler(async (req, res) => {
    const result = await searchService.search(req.query);
    return sendSuccess(res, {
      message: "Search completed",
      data: result,
    });
  }),

  adminSearch: asyncHandler(async (req, res) => {
    const result = await searchService.adminSearch(req.query);
    return sendSuccess(res, {
      message: "Search completed",
      data: result,
    });
  }),
};

module.exports = searchController;
