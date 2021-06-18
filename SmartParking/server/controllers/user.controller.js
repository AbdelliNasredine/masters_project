const Reservation = require("../models/reservation.model");
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
  // get total reservation of user
  let reservationCount = await Reservation.findAll({
    where: {
      driver_id: id,
      status: true,
    },
  });
  reservationCount = reservationCount ? reservationCount.length : 0;
  res.json({ user, reservationCount });
}

async function getUserPage(req, res) {
  const { id } = req.params;
  const user = await User.findByPk(id);
  res.render("users/view", { user });
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { firstName, lastName, balance, phoneNumber, licencePlate } = req.body;
  await User.update(
    { userInfo: { firstName, lastName, balance, phoneNumber, licencePlate } },
    { where: { id } }
  );
  // res.render("users/view", { success: "user has been created successfully" });
  res.redirect("/admin/users");
}
async function removeUser(req, res) {
  const { id } = req.params;
  await User.destroy({ where: { id } });
  res.redirect("/admin/users");
}
async function getCreatUser(req, res) {
  res.render("users/create");
}
async function postCreatUser(req, res) {
  const {
    username,
    password,
    role,
    firstName,
    lastName,
    balance,
    phoneNumber,
    licencePlate,
  } = req.body;

  // check if user is found with username
  const user = await User.findOne({ where: { username } });
  if (user) {
    res.render("users/create", { error: "username must bee unique" });
    return;
  }

  // save user in databases
  await User.create({
    username,
    password,
    role,
    userInfo: {
      balance,
      firstName,
      lastName,
      phoneNumber,
      licencePlate,
    },
  });

  res.render("users/create", { success: "user has been created successfully" });
}

module.exports = {
  getAllUsers,
  updateUserInformation,
  getAuthUserInformation,
  getUserPage,
  updateUser,
  removeUser,
  getCreatUser,
  postCreatUser,
};
