const express = require("express");
const categoryController = require("../controllers/category.controller");
const authenticate = require("../middleware/auth.middleware");
const { isEditorOrAbove } = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");
const {
  createCategoryValidator,
  updateCategoryValidator,
  categoryIdValidator,
} = require("../validators/category.validator");

const router = express.Router();

router.use(authenticate, isEditorOrAbove);

router.post("/", createCategoryValidator, validate, categoryController.createCategory);
router.get("/", categoryController.getCategories);
router.get("/:id", categoryIdValidator, validate, categoryController.getCategoryById);
router.put("/:id", updateCategoryValidator, validate, categoryController.updateCategory);
router.delete("/:id", categoryIdValidator, validate, categoryController.deleteCategory);

module.exports = router;
