const User = require("../models/user.model");

// GET
function index(req, res) {
  res.redirect("/dashboard");
}

async function dashboardPage(req, res) {
  // const user_id = req.session.user;
  // const user = await User.findByPk(user_id);
  // console.log(`auth user : \n ${user.toJSON()}`);
  res.render("dashboard");
}

// POST

module.exports = { index, dashboardPage };
