const Parking = require("../models/parking.model");
const Reservation = require("../models/reservation.model");
const User = require("../models/user.model");

//  ==> /admin/parking/create -> creating new parking
//  ==> /admin/parking/{id}/view -> view Parking
//  ==> /admin/parking/{id}/update -> update parking
//  ==> /admin/parking/{id}/delete -> delete parking

async function getCreate(req, res) {
  res.render("parking/create");
}
async function postCreate(req, res) {
  console.log(req.body);

  const { name, description, address, price, latitude, longitude } = req.body;

  const parking = await Parking.create({
    name,
    description,
    address,
    rentPrice: price,
    lat: latitude,
    lon: longitude,
  });

  res.redirect("/admin/parks");
}
async function view(req, res) {
  const { dataValues } = await Parking.findByPk(req.params.id);
  res.render("parking/view", { parking: dataValues });
}
async function getUpdate(req, res) {}
async function postUpdate(req, res) {}
async function getRemove(req, res) {
  const { id } = req.params;
  await Parking.destroy({ where: { id } });
  res.redirect("/admin/parks");
}
async function postRemove(req, res) {}

async function addVehicleToAuthorizedList(req, res) {
  const parking_id = req.params.id;
  const { licencePlate } = req.body;

  const parking = await Parking.findByPk(parking_id);
  let authorizedVehicles = parking.authorizedVehicles;
  console.log(authorizedVehicles);
  if (!authorizedVehicles) {
    authorizedVehicles = [];
  }
  authorizedVehicles.push(licencePlate);
  await Parking.update({ authorizedVehicles }, { where: { id: parking_id } });
  res.redirect(`/admin/parks/${parking_id}/view`);
}

async function configureSpots(req, res) {
  const parking_id = req.params.id;
  const { size } = req.body;
  const spotsArray = Array.from({ length: size }, (_, i) => i + 1).map(
    (id) => ({ id })
  );
  const parking = await Parking.findByPk(parking_id);
  parking.parkingSpots = spotsArray;
  await parking.save();
  res.redirect(`/admin/parks/${parking_id}/view`);
}

// api routes
async function getAllParkingPlaces(req, res) {
  const parkingPlaces = await Parking.findAll();
  res.json(parkingPlaces);
}

async function verifyLicencePlate(req, res) {
  const { id } = req.params;
  const { plate } = req.body;
  let found;

  async function plateInReservedList({ driver_id, reservation_id }) {
    // get the user
    const driver = await User.findByPk(driver_id);
    if (driver) {
      // check driver licence plate
      const { userInfo } = driver;
      if (userInfo) {
        // save driver & reservation id
        // found_reservedSpot = { driver_id, reservation_id };
        console.log(
          "driver licence is equal = ",
          userInfo.licencePlate == plate
        );
        return userInfo.licencePlate == plate
          ? { driver_id, reservation_id }
          : null;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  if (plate) {
    console.log("Plate = ", plate);
    // retrieve parking information
    const parking = await Parking.findByPk(id);
    if (parking) {
      // verify if its in authorized vehicles list or in reserved list
      // 1 - ins auth V list
      const { authorizedVehicles } = parking;
      if (authorizedVehicles) {
        found = parking.authorizedVehicles.some(
          (licencePlate) => licencePlate == plate
        );
        console.log("Found 1 = ", found);
        if (found) {
          // SUCCESS OPEN GATE
          res.json({ authorized: true });
        } else {
          // 2 - in reserved list
          const { reservedSpots } = parking;
          if (reservedSpots) {
            // const found_reservedSpot = await reservedSpots.filter(
            //   filterPlateInReservedList
            // )[0];
            let found_reservedSpot = false;
            for (const reservation of reservedSpots) {
              found_reservedSpot = await plateInReservedList(reservation);
              if (found_reservedSpot) break;
            }
            console.log("Found 2 = ", found_reservedSpot);
            if (found_reservedSpot) {
              // SUCCESS OPEN GATE
              // TODO:
              // before sending command check if the driver is in parking
              // by viewing reservation start date
              // if start date if found,
              //    then the driver is going out of parking
              // else ,
              //    driver is entering  the parking
              // but we are using a single camera the handle just entering
              const reservation = await Reservation.findByPk(
                found_reservedSpot.reservation_id
              );
              console.log(reservation);
              if (reservation && !reservation.status) {
                // update status
                await Reservation.update(
                  { status: true },
                  { where: { id: reservation.id } }
                );
              }
              res.json({ authorized: true });
            } else {
              // FAILED CLOSE GATE
              res.json({ authorized: false });
            }
          } else {
            res.json({ authorized: false });
          }
        }
      } else {
        res.json({ authorized: false });
      }
    } else {
      res.json({ authorized: false });
    }
  } else {
    res.json({ authorized: false });
  }
}

module.exports = {
  getCreate,
  postCreate,
  view,
  getUpdate,
  postUpdate,
  getRemove,
  postRemove,
  addVehicleToAuthorizedList,
  getAllParkingPlaces,
  configureSpots,
  verifyLicencePlate,
};
