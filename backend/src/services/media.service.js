const fs = require("fs");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/AppError.util");
const mediaRepository = require("../repositories/media.repository");
const env = require("../config/env");
const { getPagination, buildPaginationMeta } = require("../utils/pagination.util");

const mediaService = {
  async uploadMedia(file, userId, alt = "") {
    if (!file) {
      throw new AppError("No file uploaded", StatusCodes.BAD_REQUEST);
    }

    const url = `/uploads/${file.filename}`;

    return mediaRepository.create({
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      url,
      alt,
      uploadedBy: userId,
    });
  },

  async getMedia(query) {
    const { page, limit, skip } = getPagination(query);
    const filter = {};

    if (query.mimeType) {
      filter.mimeType = { $regex: query.mimeType, $options: "i" };
    }

    const [media, total] = await Promise.all([
      mediaRepository.findAll({ filter, skip, limit }),
      mediaRepository.count(filter),
    ]);

    return {
      media,
      pagination: buildPaginationMeta({ page, limit, total }),
    };
  },

  async getMediaById(id) {
    const media = await mediaRepository.findById(id);

    if (!media) {
      throw new AppError("Media not found", StatusCodes.NOT_FOUND);
    }

    return media;
  },

  async updateMedia(id, data) {
    const media = await mediaRepository.findById(id);

    if (!media) {
      throw new AppError("Media not found", StatusCodes.NOT_FOUND);
    }

    return mediaRepository.updateById(id, data);
  },

  async deleteMedia(id) {
    const media = await mediaRepository.findById(id);

    if (!media) {
      throw new AppError("Media not found", StatusCodes.NOT_FOUND);
    }

    const filePath = path.resolve(process.cwd(), env.uploadDir, media.filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await mediaRepository.deleteById(id);
    return { message: "Media deleted successfully" };
  },
};

module.exports = mediaService;
