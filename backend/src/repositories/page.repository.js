const Page = require("../models/page.model");

const pageRepository = {
  create(data) {
    return Page.create(data);
  },

  findById(id) {
    return Page.findById(id).populate("author", "name email avatar");
  },

  findBySlug(slug) {
    return Page.findOne({ slug }).populate("author", "name email avatar");
  },

  findAll({ filter = {}, skip = 0, limit = 10, sort = { createdAt: -1 } }) {
    return Page.find(filter)
      .populate("author", "name email avatar")
      .sort(sort)
      .skip(skip)
      .limit(limit);
  },

  count(filter = {}) {
    return Page.countDocuments(filter);
  },

  updateById(id, data) {
    return Page.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("author", "name email avatar");
  },

  deleteById(id) {
    return Page.findByIdAndDelete(id);
  },

  search(query, { skip = 0, limit = 10 } = {}) {
    return Page.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .skip(skip)
      .limit(limit)
      .populate("author", "name email avatar");
  },

  searchCount(query) {
    return Page.countDocuments({ $text: { $search: query } });
  },
};

module.exports = pageRepository;
