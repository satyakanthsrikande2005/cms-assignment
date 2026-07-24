const { StatusCodes } = require("http-status-codes");
const postService = require("../services/post.service");
const { sendSuccess } = require("../utils/apiResponse.util");
const asyncHandler = require("../utils/asyncHandler.util");

const postController = {
  createPost: asyncHandler(async (req, res) => {
    const post = await postService.createPost(req.body, req.user._id);
    return sendSuccess(res, {
      statusCode: StatusCodes.CREATED,
      message: "Post created successfully",
      data: { post },
    });
  }),

  getPosts: asyncHandler(async (req, res) => {
    const result = await postService.getPosts(req.query, req.user);
    return sendSuccess(res, {
      message: "Posts retrieved",
      data: result,
    });
  }),

  getPostById: asyncHandler(async (req, res) => {
    const post = await postService.getPostById(req.params.id, req.user);
    return sendSuccess(res, {
      message: "Post retrieved",
      data: { post },
    });
  }),

  updatePost: asyncHandler(async (req, res) => {
    const post = await postService.updatePost(req.params.id, req.body, req.user);
    return sendSuccess(res, {
      message: "Post updated successfully",
      data: { post },
    });
  }),

  deletePost: asyncHandler(async (req, res) => {
    const result = await postService.deletePost(req.params.id, req.user);
    return sendSuccess(res, {
      message: result.message,
      data: {},
    });
  }),
};

module.exports = postController;
