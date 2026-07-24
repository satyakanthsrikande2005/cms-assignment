const express = require("express");
const tagController = require("../controllers/tag.controller");
const authenticate = require("../middleware/auth.middleware");
const { isEditorOrAbove } = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");
const {
  createTagValidator,
  updateTagValidator,
  tagIdValidator,
} = require("../validators/tag.validator");

const router = express.Router();

router.use(authenticate, isEditorOrAbove);

router.post("/", createTagValidator, validate, tagController.createTag);
router.get("/", tagController.getTags);
router.get("/:id", tagIdValidator, validate, tagController.getTagById);
router.put("/:id", updateTagValidator, validate, tagController.updateTag);
router.delete("/:id", tagIdValidator, validate, tagController.deleteTag);

module.exports = router;
