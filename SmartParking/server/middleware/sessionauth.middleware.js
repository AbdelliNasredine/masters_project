const User = require("../models/user.model");

function clearCookie(req, res, next) {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
}

function sessionAuth(req, res, next) {
  if (!req.session.user) {
    res.redirect("/admin/login");
  } else {
    next();
  }
}

module.exports = { clearCookie, sessionAuth };
