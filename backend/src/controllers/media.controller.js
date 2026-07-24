const { StatusCodes } = require("http-status-codes");
const mediaService = require("../services/media.service");
const { sendSuccess } = require("../utils/apiResponse.util");
const asyncHandler = require("../utils/asyncHandler.util");

const mediaController = {
  uploadMedia: asyncHandler(async (req, res) => {
    const media = await mediaService.uploadMedia(
      req.file,
      req.user._id,
      req.body.alt
    );
    return sendSuccess(res, {
      statusCode: StatusCodes.CREATED,
      message: "File uploaded successfully",
      data: { media },
    });
  }),

  getMedia: asyncHandler(async (req, res) => {
    const result = await mediaService.getMedia(req.query);
    return sendSuccess(res, {
      message: "Media retrieved",
      data: result,
    });
  }),

  getMediaById: asyncHandler(async (req, res) => {
    const media = await mediaService.getMediaById(req.params.id);
    return sendSuccess(res, {
      message: "Media retrieved",
      data: { media },
    });
  }),

  updateMedia: asyncHandler(async (req, res) => {
    const media = await mediaService.updateMedia(req.params.id, req.body);
    return sendSuccess(res, {
      message: "Media updated successfully",
      data: { media },
    });
  }),

  deleteMedia: asyncHandler(async (req, res) => {
    const result = await mediaService.deleteMedia(req.params.id);
    return sendSuccess(res, {
      message: result.message,
      data: {},
    });
  }),
};

module.exports = mediaController;
