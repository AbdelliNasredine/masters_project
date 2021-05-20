const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

// API AUTH
router.post("/api/register", authController.register);
router.post("/api/login", authController.jwtLogin);

// WEB AUTH
router.get("/login", authController.sessionLoginGet);
router.post("/login", authController.sessionLoginPost);
router.get("/logout", authController.sessionLogout);

module.exports = router;
