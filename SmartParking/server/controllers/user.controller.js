const User = require("../models/user.model");

async function getAllUsers(req, res) {
  const users = await User.findAll();
  res.json(users);
}

async function updateUserInformation(req, res) {
  console.log(req.body);
  const { id } = req.auth;
  res.json({});
}

async function getAuthUserInformation(req, res) {
  const { id } = req.auth;
  const user = await User.findByPk(id);
  res.json(user);
}

module.exports = { getAllUsers, updateUserInformation, getAuthUserInformation };
