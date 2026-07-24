const Tag = require("../models/tag.model");

const tagRepository = {
  create(data) {
    return Tag.create(data);
  },

  findById(id) {
    return Tag.findById(id);
  },

  findBySlug(slug) {
    return Tag.findOne({ slug });
  },

  findAll({ filter = {}, skip = 0, limit = 50, sort = { name: 1 } }) {
    return Tag.find(filter).sort(sort).skip(skip).limit(limit);
  },

  count(filter = {}) {
    return Tag.countDocuments(filter);
  },

  updateById(id, data) {
    return Tag.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  },

  deleteById(id) {
    return Tag.findByIdAndDelete(id);
  },
};

module.exports = tagRepository;
