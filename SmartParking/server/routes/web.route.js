const express = require("express");
const middleware = require("../middleware/sessionauth.middleware");
const User = require("../models/user.model");
const adminController = require("../controllers/admin.controller");
const parkingController = require("../controllers/parking.controller");
const router = express.Router();

// middleware
router.use(middleware.sessionAuth);

router.use(async (req, res, next) => {
  const user_id = req.session.user;
  const user = await User.findByPk(user_id);
  res.locals.username = user.username;
  next();
});

router.use((req, res, next) => {
  const path = req.path.split("/");
  const routeName = path[1];
  res.locals.routeName = routeName;
  console.log(path, routeName);
  next();
});

// routes
router.get("/dashboard", adminController.dashboardPage);
router.get("/parks", adminController.parksPage);
router.get("/users", adminController.usersPage);
router.get("/payments", adminController.paymentsPage);
router.get("/profile", adminController.profilePage);
router.get("/", adminController.index);

// parking routes GET
router.get("/parks/create", parkingController.getCreate);
router.get("/parks/:id/view", parkingController.view);
router.get("/parks/:id/update", parkingController.getUpdate);
router.get("/parks/:id/remove", parkingController.getRemove);

// parking routes POST
router.post("/parks/create", parkingController.postCreate);
router.post(
  "/parks/:id/add_vehicle",
  parkingController.addVehicleToAuthorizedList
);
router.post("/parks/:id/update", parkingController.postUpdate);
router.post("/parks/:id/remove", parkingController.postRemove);

module.exports = router;
