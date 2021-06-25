const express = require("express");
const authMiddleware = require("../middleware/jwtauth.middleware");
const userController = require("../controllers/user.controller");
const parkingController = require("../controllers/parking.controller");
const reservationController = require("../controllers/reservations.controller");
const router = express.Router();

// authentication middleware
router.use(authMiddleware);

// routes
// router.get("/users", userController.getAllUsers);
router.get("/me", userController.getAuthUserInformation);
router.post("/user/update", userController.updateUserInformation);

// get all parking places
router.get("/parkings", parkingController.getAllParkingPlaces);

router.post("/reserve", reservationController.reserve);
router.post("/checkout", reservationController.checkout);

router.get(
  "/reservation_status",
  reservationController.getAuthCurrentReservationStatus
);

module.exports = router;
