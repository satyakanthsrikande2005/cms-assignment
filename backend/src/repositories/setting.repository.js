const Setting = require("../models/setting.model");

const settingRepository = {
  upsert(key, value, group = "general") {
    return Setting.findOneAndUpdate(
      { key },
      { key, value, group },
      { new: true, upsert: true, runValidators: true }
    );
  },

  findByKey(key) {
    return Setting.findOne({ key });
  },

  findByGroup(group) {
    return Setting.find({ group });
  },

  findAll() {
    return Setting.find().sort({ group: 1, key: 1 });
  },

  deleteByKey(key) {
    return Setting.findOneAndDelete({ key });
  },
};

module.exports = settingRepository;
