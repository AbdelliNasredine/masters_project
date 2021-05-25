const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user.model");

// registration function
async function register(req, res) {
  const { username, password } = req.body;

  // validation
  if (!username || !password) {
    return res
      .status(400)
      .json({ status: 400, msg: "Empty username or password" });
  }
  const userWithSameName = await User.findOne({ where: { username } });
  if (userWithSameName) {
    return res
      .status(400)
      .json({ status: 400, msg: "Username already in use" });
  }

  // save new user in database
  const user = await User.create({
    username,
    password,
    role: "driver",
  });

  res.status(200).json({ status: 200, msg: "User created successfully" });
}

// JWT login function
async function jwtLogin(req, res) {
  const { username, password } = req.body;

  // find user with specified credentials
  const user = await User.findOne({ where: { username } });

  if (!user) {
    return res
      .status(400)
      .json({ status: 400, msg: "Username or password incorrect" });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res
      .status(400)
      .json({ status: 400, msg: "Username or password incorrect" });
  }

  const payload = { id: user.id, name: user.name, role: user.role };
  const secret = config.auth.tokenSecret;
  const accessToken = jwt.sign(payload, secret);
  return res.status(200).json({ accessToken });
}

// SESSION login function
function sessionLoginGet(req, res) {
  res.render("login");
}
async function sessionLoginPost(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    res.render("login", { error: "Wrong Credentials" });
  } else if (!user.verifyPassword(password)) {
    res.render("login", { error: "Wrong Credentials" });
  } else {
    req.session.user = user.id;
    res.redirect("/admin/dashboard");
  }
}

// SESSION logout function
function sessionLogout(req, res) {
  req.session.destroy();
  res.redirect("/admin/");
}

module.exports = {
  register,
  jwtLogin,
  sessionLogout,
  sessionLoginPost,
  sessionLoginGet,
};
