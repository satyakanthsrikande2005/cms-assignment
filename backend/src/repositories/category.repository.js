const Category = require("../models/category.model");

const categoryRepository = {
  create(data) {
    return Category.create(data);
  },

  findById(id) {
    return Category.findById(id);
  },

  findBySlug(slug) {
    return Category.findOne({ slug });
  },

  findAll({ filter = {}, skip = 0, limit = 50, sort = { name: 1 } }) {
    return Category.find(filter).sort(sort).skip(skip).limit(limit);
  },

  count(filter = {}) {
    return Category.countDocuments(filter);
  },

  updateById(id, data) {
    return Category.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  },

  deleteById(id) {
    return Category.findByIdAndDelete(id);
  },
};

module.exports = categoryRepository;
