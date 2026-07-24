const express = require("express");
const publicController = require("../controllers/public.controller");

const router = express.Router();

router.get("/pages", publicController.getPages);
router.get("/pages/:slug", publicController.getPageBySlug);
router.get("/posts", publicController.getPosts);
router.get("/posts/:slug", publicController.getPostBySlug);
router.get("/categories", publicController.getCategories);
router.get("/tags", publicController.getTags);
router.get("/search", publicController.search);
router.get("/settings", publicController.getSettings);

module.exports = router;
