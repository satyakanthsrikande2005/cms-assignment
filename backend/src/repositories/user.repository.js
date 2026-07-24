const User = require("../models/user.model");

const userRepository = {
  create(data) {
    return User.create(data);
  },

  findById(id) {
    return User.findById(id);
  },

  findByIdWithPassword(id) {
    return User.findById(id).select("+password");
  },

  findByEmail(email) {
    return User.findOne({ email: email.toLowerCase() });
  },

  findByEmailWithPassword(email) {
    return User.findOne({ email: email.toLowerCase() }).select("+password");
  },

  findAll({ filter = {}, skip = 0, limit = 10, sort = { createdAt: -1 } }) {
    return User.find(filter).sort(sort).skip(skip).limit(limit);
  },

  count(filter = {}) {
    return User.countDocuments(filter);
  },

  updateById(id, data) {
    return User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  },

  deleteById(id) {
    return User.findByIdAndDelete(id);
  },
};

module.exports = userRepository;
