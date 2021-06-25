const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

// API AUTH
router.post("/api/register", authController.register);
router.post("/api/login", authController.jwtLogin);

// WEB AUTH
router.get("/admin/login", authController.sessionLoginGet);
router.post("/admin/login", authController.sessionLoginPost);
router.get("/admin/logout", authController.sessionLogout);

module.exports = router;
