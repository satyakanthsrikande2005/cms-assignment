const settingService = require("../services/setting.service");
const { sendSuccess } = require("../utils/apiResponse.util");
const asyncHandler = require("../utils/asyncHandler.util");

const settingController = {
  getSettings: asyncHandler(async (req, res) => {
    const settings = await settingService.getSettings();
    return sendSuccess(res, {
      message: "Settings retrieved",
      data: { settings },
    });
  }),

  getPublicSettings: asyncHandler(async (req, res) => {
    const settings = await settingService.getPublicSettings();
    return sendSuccess(res, {
      message: "Settings retrieved",
      data: { settings },
    });
  }),

  updateSettings: asyncHandler(async (req, res) => {
    const settings = await settingService.updateSettings(req.body);
    return sendSuccess(res, {
      message: "Settings updated successfully",
      data: { settings },
    });
  }),
};

module.exports = settingController;
