const { body } = require("express-validator");

const updateSettingsValidator = [
  body("siteName").optional().trim().notEmpty(),
  body("siteDescription").optional().trim(),
  body("siteUrl").optional().trim().isURL().withMessage("Invalid site URL"),
  body("contactEmail").optional().isEmail().withMessage("Invalid contact email"),
  body("postsPerPage").optional().isInt({ min: 1, max: 100 }),
  body("defaultMetaTitle").optional().trim(),
  body("defaultMetaDescription").optional().trim(),
  body("googleAnalyticsId").optional().trim(),
];

module.exports = { updateSettingsValidator };
