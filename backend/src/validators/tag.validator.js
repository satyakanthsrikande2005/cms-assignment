const { body, param } = require("express-validator");

const createTagValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("slug").optional().trim(),
];

const updateTagValidator = [
  param("id").isMongoId().withMessage("Invalid tag ID"),
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
  body("slug").optional().trim(),
];

const tagIdValidator = [param("id").isMongoId().withMessage("Invalid tag ID")];

module.exports = { createTagValidator, updateTagValidator, tagIdValidator };
