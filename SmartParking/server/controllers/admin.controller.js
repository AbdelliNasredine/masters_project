const { Op } = require("sequelize");
const User = require("../models/user.model");
const Reservation = require("../models/reservation.model");
const Parking = require("../models/parking.model");

async function index(req, res) {
  res.redirect("/admin/dashboard");
}

async function dashboardPage(req, res) {
  const userCount = await User.findAll({
    where: {
      id: {
        [Op.not]: req.session.user,
      },
    },
  });

  const reservationCount = await Reservation.findAll();
  const parkings = await Parking.findAll();

  console.log("-------- LOGS ----------");
  console.log(`userCount = ${userCount.length}`);

  res.render("dashboard", {
    userCount: userCount.length,
    reservationCount: reservationCount.length,
    parkingCount: parkings.length,
    parkings: parkings.map((p) => [p.lat, p.lon]),
  });
}

async function parksPage(req, res) {
  const parks = await Parking.findAll();
  res.render("parks", { parks });
}

async function usersPage(req, res) {
  const users = await User.findAll({
    where: {
      id: {
        [Op.not]: req.session.user,
      },
    },
  });
  res.render("users", { users });
}

async function profilePage(req, res) {
  res.render("profile");
}

module.exports = {
  index,
  dashboardPage,
  parksPage,
  usersPage,
  profilePage,
};
