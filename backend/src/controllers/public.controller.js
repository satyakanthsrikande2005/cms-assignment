const pageService = require("../services/page.service");
const postService = require("../services/post.service");
const categoryService = require("../services/category.service");
const tagService = require("../services/tag.service");
const searchService = require("../services/search.service");
const settingService = require("../services/setting.service");
const { sendSuccess } = require("../utils/apiResponse.util");
const asyncHandler = require("../utils/asyncHandler.util");

const publicController = {
  getPages: asyncHandler(async (req, res) => {
    const result = await pageService.getPublishedPages(req.query);
    return sendSuccess(res, {
      message: "Pages retrieved",
      data: result,
    });
  }),

  getPageBySlug: asyncHandler(async (req, res) => {
    const page = await pageService.getPublishedPageBySlug(req.params.slug);
    return sendSuccess(res, {
      message: "Page retrieved",
      data: { page },
    });
  }),

  getPosts: asyncHandler(async (req, res) => {
    const result = await postService.getPublishedPosts(req.query);
    return sendSuccess(res, {
      message: "Posts retrieved",
      data: result,
    });
  }),

  getPostBySlug: asyncHandler(async (req, res) => {
    const post = await postService.getPublishedPostBySlug(req.params.slug);
    return sendSuccess(res, {
      message: "Post retrieved",
      data: { post },
    });
  }),

  getCategories: asyncHandler(async (req, res) => {
    const result = await categoryService.getCategories({
      ...req.query,
      isActive: "true",
    });
    return sendSuccess(res, {
      message: "Categories retrieved",
      data: result,
    });
  }),

  getTags: asyncHandler(async (req, res) => {
    const result = await tagService.getTags(req.query);
    return sendSuccess(res, {
      message: "Tags retrieved",
      data: result,
    });
  }),

  search: asyncHandler(async (req, res) => {
    const result = await searchService.search(req.query);
    return sendSuccess(res, {
      message: "Search completed",
      data: result,
    });
  }),

  getSettings: asyncHandler(async (req, res) => {
    const settings = await settingService.getPublicSettings();
    return sendSuccess(res, {
      message: "Settings retrieved",
      data: { settings },
    });
  }),
};

module.exports = publicController;
