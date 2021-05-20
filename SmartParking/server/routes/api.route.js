const express = require("express");
const authMiddleware = require("../middleware/jwtauth.middleware");
const userController = require("../controllers/user.controller");
const router = express.Router();

const API_BASE_URI = "/api";

// authentication middleware
router.use(authMiddleware);

// routes
router.get(`${API_BASE_URI}/users`, userController.getAllUsers);

module.exports = router;
