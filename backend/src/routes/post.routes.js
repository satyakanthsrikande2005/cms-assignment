const express = require("express");
const postController = require("../controllers/post.controller");
const authenticate = require("../middleware/auth.middleware");
const { isAuthorOrAbove } = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");
const {
  createPostValidator,
  updatePostValidator,
  postIdValidator,
} = require("../validators/post.validator");

const router = express.Router();

router.use(authenticate, isAuthorOrAbove);

router.post("/", createPostValidator, validate, postController.createPost);
router.get("/", postController.getPosts);
router.get("/:id", postIdValidator, validate, postController.getPostById);
router.put("/:id", updatePostValidator, validate, postController.updatePost);
router.delete("/:id", postIdValidator, validate, postController.deletePost);

module.exports = router;
