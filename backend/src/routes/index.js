const express = require("express");
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const pageRoutes = require("./page.routes");
const postRoutes = require("./post.routes");
const categoryRoutes = require("./category.routes");
const tagRoutes = require("./tag.routes");
const mediaRoutes = require("./media.routes");
const searchRoutes = require("./search.routes");
const settingRoutes = require("./setting.routes");
const publicRoutes = require("./public.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/pages", pageRoutes);
router.use("/posts", postRoutes);
router.use("/categories", categoryRoutes);
router.use("/tags", tagRoutes);
router.use("/media", mediaRoutes);
router.use("/search", searchRoutes);
router.use("/settings", settingRoutes);
router.use("/public", publicRoutes);

module.exports = router;
