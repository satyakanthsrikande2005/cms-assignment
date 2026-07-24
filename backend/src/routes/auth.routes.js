const express = require("express");
const authController = require("../controllers/auth.controller");
const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const {
  loginValidator,
  changePasswordValidator,
} = require("../validators/auth.validator");

const router = express.Router();

router.post("/login", loginValidator, validate, authController.login);
router.get("/me", authenticate, authController.getProfile);
router.put(
  "/change-password",
  authenticate,
  changePasswordValidator,
  validate,
  authController.changePassword
);

module.exports = router;
