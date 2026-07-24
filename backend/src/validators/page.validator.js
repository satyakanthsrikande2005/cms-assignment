const { body, param } = require("express-validator");
const { STATUS_LIST } = require("../constants/roles.constant");

const seoValidator = [
  body("seo.metaTitle").optional().trim().isLength({ max: 160 }),
  body("seo.metaDescription").optional().trim().isLength({ max: 320 }),
  body("seo.ogImage").optional().trim(),
  body("seo.keywords").optional().isArray(),
];

const createPageValidator = [
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("slug").optional().trim(),
  body("content").optional(),
  body("excerpt").optional().trim().isLength({ max: 500 }),
  body("featuredImage").optional().trim(),
  body("status").optional().isIn(STATUS_LIST).withMessage("Invalid status"),
  ...seoValidator,
];

const updatePageValidator = [
  param("id").isMongoId().withMessage("Invalid page ID"),
  body("title").optional().trim().notEmpty().withMessage("Title cannot be empty"),
  body("slug").optional().trim(),
  body("content").optional(),
  body("excerpt").optional().trim().isLength({ max: 500 }),
  body("featuredImage").optional().trim(),
  body("status").optional().isIn(STATUS_LIST).withMessage("Invalid status"),
  ...seoValidator,
];

const pageIdValidator = [param("id").isMongoId().withMessage("Invalid page ID")];

module.exports = { createPageValidator, updatePageValidator, pageIdValidator };
