const { StatusCodes } = require("http-status-codes");
const categoryService = require("../services/category.service");
const { sendSuccess } = require("../utils/apiResponse.util");
const asyncHandler = require("../utils/asyncHandler.util");

const categoryController = {
  createCategory: asyncHandler(async (req, res) => {
    const category = await categoryService.createCategory(req.body);
    return sendSuccess(res, {
      statusCode: StatusCodes.CREATED,
      message: "Category created successfully",
      data: { category },
    });
  }),

  getCategories: asyncHandler(async (req, res) => {
    const result = await categoryService.getCategories(req.query);
    return sendSuccess(res, {
      message: "Categories retrieved",
      data: result,
    });
  }),

  getCategoryById: asyncHandler(async (req, res) => {
    const category = await categoryService.getCategoryById(req.params.id);
    return sendSuccess(res, {
      message: "Category retrieved",
      data: { category },
    });
  }),

  updateCategory: asyncHandler(async (req, res) => {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    return sendSuccess(res, {
      message: "Category updated successfully",
      data: { category },
    });
  }),

  deleteCategory: asyncHandler(async (req, res) => {
    const result = await categoryService.deleteCategory(req.params.id);
    return sendSuccess(res, {
      message: result.message,
      data: {},
    });
  }),
};

module.exports = categoryController;
