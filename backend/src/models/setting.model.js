const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    group: {
      type: String,
      trim: true,
      default: "general",
    },
  },
  { timestamps: true }
);

settingSchema.index({ key: 1 });
settingSchema.index({ group: 1 });

module.exports = mongoose.model("Setting", settingSchema);
