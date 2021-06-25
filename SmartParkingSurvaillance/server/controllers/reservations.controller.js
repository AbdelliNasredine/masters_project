const Reservation = require("../models/reservation.model");
const Parking = require("../models/parking.model");
const User = require("../models/user.model");
const moment = require("moment");

async function all(req, res) {
  const reservations = await Reservation.findAll();
  res.render("reservations", { reservations });
}

async function view(req, res) {
  const { id } = req.params;
}

// api specific functions
async function reserve(req, res) {
  const { id } = req.auth;
  const { parkingId, spotId } = req.body;
  console.log("--> user ", id);
  console.log(` --> parking_id ${parkingId}`);
  console.log(` --> spot_id ${spotId}`);
  if (parkingId && spotId) {
    // if there is another driver that resers the same spot
    const already_reserved = await Reservation.findOne({
      where: { parking_id: parkingId, spot_id: spotId, endDate: null },
    });
    if (already_reserved && already_reserved.id != id) {
      return res.json({ error: "Spot has been reserved by another user" });
    }
    // find if the driver is already reserving a spot
    const found_reservation = await Reservation.findOne({
      where: {
        driver_id: id,
        status: false,
      },
    });
    if (!found_reservation) {
      const parking = await Parking.findByPk(parkingId);

      // process payment
      const driver = await User.findByPk(id);
      let { balance } = driver.userInfo;
      if (balance < parking.rentPrice) {
        return res.json({ error: "Insufficient Funds" });
      }
      balance -= parking.rentPrice;
      // update driver userInfo
      const updatedInfo = driver.userInfo;
      updatedInfo.balance = balance;
      await User.update({ userInfo: updatedInfo }, { where: { id: id } });
      // store reservation
      const reservation = await Reservation.create({
        parking_id: parkingId,
        spot_id: spotId,
        driver_id: id,
        startDate: new Date(),
        amount: parking.rentPrice,
      });
      // update parking reservation list
      let reservedList = parking.reservedSpots;
      reservedList = reservedList ? reservedList : [];
      reservedList.push({
        driver_id: id,
        reservation_id: reservation.id,
      });
      console.log("--- updating reserved list :", reservedList);
      parking.reservedSpots = reservedList;
      await Parking.update(
        { reservedSpots: reservedList },
        { where: { id: parkingId } }
      );
      res.json({ success: "Reservation Done" });
    } else {
      res.json({ error: "You already have reserved a parking spot" });
    }
  } else {
    res.json({ error: "Error Happened, please try again" });
  }
}

// async function checkout(req, res) {
//   const { id } = req.auth;
//   // TODO:
//   // driver is going out
//   // we need to:
//   // 1- handle payment (done)
//   // 2- update current reservation status to true
//   //    meaning, finished
//   // 3- remove entry from parking reserved list

//   // get authenticated driver
//   const driver = await User.findByPk(id);

//   // get driver current reservation (just in PENDING ie status == true)
//   const reservation = await Reservation.findOne({
//     where: { driver_id: id, status: true, endDate: null },
//   });

//   // find parking where driver car is found
//   const parking = await Parking.findByPk(reservation.parking_id);

//   // 1- PROCESS PAYMENT
//   // 1.a- get time diff in hours
//   // 1.b- calculate free (hours * feePerHour)
//   // 1.c- check if driver has enough balance
//   // 1.c.1-  if OK , subtract balance , else , show error message
//   const startDate = reservation.startDate;
//   const endDate = new Date();
//   const diff = moment
//     .utc(
//       moment(endDate, "DD/MM/YYYY HH:mm:ss").diff(
//         moment(startDate, "DD/MM/YYYY HH:mm:ss")
//       )
//     )
//     .format("HH:mm");
//   const diffHours = diff.split(":")[0];
//   const parkingFee = parseInt(diffHours) * parking.rentPrice;
//   const { balance } = driver.userInfo;
//   if (balance >= parkingFee) {
//     driver.userInfo.balance = balance - parkingFee;
//     await driver.save();
//   } else {
//     // insufficient funds
//     res.json({ error: "Insufficient funds" });
//     return;
//   }

//   // 2- UPDATING RESERVATION STATUS & END DATE TO COMPLETED
//   reservation.endDate = endDate;
//   reservation.status = true;
//   await reservation.save();

//   // 3- REMOVE FROM PARKING RESERVED LIST
//   let { reservedSpots } = parking;
//   reservedSpots = reservedSpots.filter(
//     ({ driver_id, reservation_id }) =>
//       !(driver_id == id && reservation_id == reservation.id)
//   );
//   parking.reservedSpots = reservedSpots;
//   await parking.save();
//   res.json({ success: "Transaction succeeded" });
// }

async function checkout(req, res) {
  const { id } = req.auth;

  // get authenticated driver
  const driver = await User.findByPk(id);

  // get driver current reservation (just in PENDING ie status == true)
  const reservation = await Reservation.findOne({
    where: { driver_id: id, status: true, endDate: null },
  });

  // find parking where driver car is found
  const parking = await Parking.findByPk(reservation.parking_id);

  // 2- UPDATING RESERVATION END DATE TO BE COMPLETED
  await Reservation.update(
    { endDate: new Date() },
    {
      where: {
        driver_id: id,
        status: true,
        endDate: null,
      },
    }
  );

  // 3- REMOVE FROM PARKING RESERVED LIST
  let { reservedSpots } = parking;
  reservedSpots = reservedSpots.filter(
    ({ driver_id, reservation_id }) =>
      !(driver_id == id && reservation_id == reservation.id)
  );
  await Parking.update(
    { reservedSpots },
    {
      where: {
        id: parking.id,
      },
    }
  );
  res.json({
    success: "Thank You for visiting our parking, we wish to see you again",
  });
}

async function getAuthCurrentReservationStatus(req, res) {
  const { id } = req.auth;
  const current_reservation = await Reservation.findOne({
    where: {
      driver_id: id,
      endDate: null,
    },
  });
  if (current_reservation) {
    res.json(current_reservation);
  } else {
    res.json({ error: "No reservation is found" });
  }
}

module.exports = {
  view,
  all,
  reserve,
  checkout,
  getAuthCurrentReservationStatus,
};
