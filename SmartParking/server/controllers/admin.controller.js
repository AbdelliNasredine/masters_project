const User = require("../models/user.model");
const Parking = require("../models/parking.model");

// GET
function index(req, res) {
  res.redirect("/admin/dashboard");
}

function dashboardPage(req, res) {
  res.render("dashboard");
}

async function parksPage(req, res) {
  const parks = await Parking.findAll();
  res.render("parks", { parks });
}

async function usersPage(req, res) {
  res.render("users");
}

async function paymentsPage(req, res) {
  res.render("payments");
}

async function profilePage(req, res) {
  res.render("profile");
}

// POST

module.exports = {
  index,
  dashboardPage,
  parksPage,
  usersPage,
  paymentsPage,
  profilePage,
};
