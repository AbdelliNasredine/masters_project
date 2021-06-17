const express = require("express");
const parkingController = require("../controllers/parking.controller");
const router = express.Router();

// LICENCE PLATE VERIFICATION
router.post("/parks/:id/verify", parkingController.verifyLicencePlate);

module.exports = router;
