const express = require("express");
const settingController = require("../controllers/setting.controller");
const authenticate = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/role.middleware");
const validate = require("../middleware/validate.middleware");
const { updateSettingsValidator } = require("../validators/setting.validator");

const router = express.Router();

router.use(authenticate, isAdmin);

router.get("/", settingController.getSettings);
router.put("/", updateSettingsValidator, validate, settingController.updateSettings);

module.exports = router;
