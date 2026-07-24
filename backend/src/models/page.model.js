const mongoose = require("mongoose");
const { STATUS_LIST, CONTENT_STATUSES } = require("../constants/roles.constant");

const seoSchema = new mongoose.Schema(
  {
    metaTitle: { type: String, trim: true, maxlength: 160, default: "" },
    metaDescription: { type: String, trim: true, maxlength: 320, default: "" },
    ogImage: { type: String, trim: true, default: "" },
    keywords: [{ type: String, trim: true }],
  },
  { _id: false }
);

const pageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      default: "",
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: [500, "Excerpt cannot exceed 500 characters"],
      default: "",
    },
    featuredImage: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: STATUS_LIST,
      default: CONTENT_STATUSES.DRAFT,
    },
    seo: {
      type: seoSchema,
      default: () => ({}),
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    publishedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

pageSchema.index({ slug: 1 });
pageSchema.index({ status: 1, publishedAt: -1 });
pageSchema.index({ title: "text", content: "text", excerpt: "text" });

module.exports = mongoose.model("Page", pageSchema);
