const { body, param } = require("express-validator");

const updateMediaValidator = [
  param("id").isMongoId().withMessage("Invalid media ID"),
  body("alt").optional().trim().isLength({ max: 200 }),
];

const mediaIdValidator = [param("id").isMongoId().withMessage("Invalid media ID")];

module.exports = { updateMediaValidator, mediaIdValidator };
