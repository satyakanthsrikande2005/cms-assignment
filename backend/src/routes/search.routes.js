const express = require("express");
const searchController = require("../controllers/search.controller");
const authenticate = require("../middleware/auth.middleware");
const { isAuthorOrAbove } = require("../middleware/role.middleware");

const router = express.Router();

router.use(authenticate, isAuthorOrAbove);
router.get("/", searchController.adminSearch);

module.exports = router;
