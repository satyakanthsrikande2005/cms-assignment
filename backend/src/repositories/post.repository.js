const Post = require("../models/post.model");

const postRepository = {
  create(data) {
    return Post.create(data);
  },

  findById(id) {
    return Post.findById(id)
      .populate("author", "name email avatar")
      .populate("categories", "name slug")
      .populate("tags", "name slug");
  },

  findBySlug(slug) {
    return Post.findOne({ slug })
      .populate("author", "name email avatar")
      .populate("categories", "name slug")
      .populate("tags", "name slug");
  },

  findAll({ filter = {}, skip = 0, limit = 10, sort = { createdAt: -1 } }) {
    return Post.find(filter)
      .populate("author", "name email avatar")
      .populate("categories", "name slug")
      .populate("tags", "name slug")
      .sort(sort)
      .skip(skip)
      .limit(limit);
  },

  count(filter = {}) {
    return Post.countDocuments(filter);
  },

  updateById(id, data) {
    return Post.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
      .populate("author", "name email avatar")
      .populate("categories", "name slug")
      .populate("tags", "name slug");
  },

  deleteById(id) {
    return Post.findByIdAndDelete(id);
  },

  incrementViewCount(id) {
    return Post.findByIdAndUpdate(id, { $inc: { viewCount: 1 } }, { new: true });
  },

  search(query, { skip = 0, limit = 10 } = {}) {
    return Post.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .skip(skip)
      .limit(limit)
      .populate("author", "name email avatar")
      .populate("categories", "name slug")
      .populate("tags", "name slug");
  },

  searchCount(query) {
    return Post.countDocuments({ $text: { $search: query } });
  },
};

module.exports = postRepository;
