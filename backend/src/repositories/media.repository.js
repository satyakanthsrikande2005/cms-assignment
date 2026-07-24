const Media = require("../models/media.model");

const mediaRepository = {
  create(data) {
    return Media.create(data);
  },

  findById(id) {
    return Media.findById(id).populate("uploadedBy", "name email");
  },

  findAll({ filter = {}, skip = 0, limit = 20, sort = { createdAt: -1 } }) {
    return Media.find(filter)
      .populate("uploadedBy", "name email")
      .sort(sort)
      .skip(skip)
      .limit(limit);
  },

  count(filter = {}) {
    return Media.countDocuments(filter);
  },

  updateById(id, data) {
    return Media.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("uploadedBy", "name email");
  },

  deleteById(id) {
    return Media.findByIdAndDelete(id);
  },
};

module.exports = mediaRepository;
