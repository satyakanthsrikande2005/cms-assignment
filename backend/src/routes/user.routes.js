const express = require("express");
const userController = require("../controllers/user.controller");
const authenticate = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");
const {
  createUserValidator,
  updateUserValidator,
  userIdValidator,
} = require("../validators/user.validator");

const router = express.Router();

router.use(authenticate, isAdmin);

router.post("/", createUserValidator, validate, userController.createUser);
router.get("/", userController.getUsers);
router.get("/:id", userIdValidator, validate, userController.getUserById);
router.put("/:id", updateUserValidator, validate, userController.updateUser);
router.delete("/:id", userIdValidator, validate, userController.deleteUser);

module.exports = router;
