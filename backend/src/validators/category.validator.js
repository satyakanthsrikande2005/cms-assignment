const { body, param } = require("express-validator");

const createCategoryValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("slug").optional().trim(),
  body("description").optional().trim().isLength({ max: 500 }),
  body("isActive").optional().isBoolean(),
];

const updateCategoryValidator = [
  param("id").isMongoId().withMessage("Invalid category ID"),
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
  body("slug").optional().trim(),
  body("description").optional().trim().isLength({ max: 500 }),
  body("isActive").optional().isBoolean(),
];

const categoryIdValidator = [
  param("id").isMongoId().withMessage("Invalid category ID"),
];

module.exports = {
  createCategoryValidator,
  updateCategoryValidator,
  categoryIdValidator,
};
