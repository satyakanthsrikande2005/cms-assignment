const express = require("express");
const mediaController = require("../controllers/media.controller");
const authenticate = require("../middleware/auth.middleware");
const { isAuthorOrAbove } = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");
const upload = require("../middleware/upload.middleware");
const {
  updateMediaValidator,
  mediaIdValidator,
} = require("../validators/media.validator");

const router = express.Router();

router.use(authenticate, isAuthorOrAbove);

router.post("/upload", upload.single("file"), mediaController.uploadMedia);
router.get("/", mediaController.getMedia);
router.get("/:id", mediaIdValidator, validate, mediaController.getMediaById);
router.put("/:id", updateMediaValidator, validate, mediaController.updateMedia);
router.delete("/:id", mediaIdValidator, validate, mediaController.deleteMedia);

module.exports = router;
