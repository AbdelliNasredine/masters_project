const User = require("../models/user.model");

function clearCookie(req, res, next) {
  console.log(
    `==> From clear auth middleware: 
        -- session = ${req.session.user},
        -- cookie = ${req.cookies.user_sid}`
  );
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
}

function sessionAuth(req, res, next) {
  console.log(
    `==> From session auth middleware: 
        -- session = ${req.session.user},
        -- cookie = ${req.cookies.user_sid}`
  );
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
}

module.exports = { clearCookie, sessionAuth };
