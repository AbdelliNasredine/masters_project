const express = require("express");
const middleware = require("../middleware/sessionauth.middleware");
const User = require("../models/user.model");
const adminController = require("../controllers/admin.controller");
const router = express.Router();

// middleware
router.use(middleware.sessionAuth);
router.use(async (req, res, next) => {
  const user_id = req.session.user;
  const user = await User.findByPk(user_id);
  res.locals.username = user.username;
  next();
});

// routes
router.get("/dashboard", adminController.dashboardPage);
router.get("/", adminController.index);

module.exports = router;
