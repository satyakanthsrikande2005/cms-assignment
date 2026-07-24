const express = require("express");
const pageController = require("../controllers/page.controller");
const authenticate = require("../middleware/auth.middleware");
const { isAuthorOrAbove } = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");
const {
  createPageValidator,
  updatePageValidator,
  pageIdValidator,
} = require("../validators/page.validator");

const router = express.Router();

router.use(authenticate, isAuthorOrAbove);

router.post("/", createPageValidator, validate, pageController.createPage);
router.get("/", pageController.getPages);
router.get("/:id", pageIdValidator, validate, pageController.getPageById);
router.put("/:id", updatePageValidator, validate, pageController.updatePage);
router.delete("/:id", pageIdValidator, validate, pageController.deletePage);

module.exports = router;
