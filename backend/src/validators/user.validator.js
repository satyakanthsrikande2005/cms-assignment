const { body, param } = require("express-validator");
const { ROLE_LIST } = require("../constants/roles.constant");

const createUserValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("role").optional().isIn(ROLE_LIST).withMessage("Invalid role"),
];

const updateUserValidator = [
  param("id").isMongoId().withMessage("Invalid user ID"),
  body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("role").optional().isIn(ROLE_LIST).withMessage("Invalid role"),
  body("isActive").optional().isBoolean().withMessage("isActive must be boolean"),
];

const userIdValidator = [param("id").isMongoId().withMessage("Invalid user ID")];

module.exports = { createUserValidator, updateUserValidator, userIdValidator };
