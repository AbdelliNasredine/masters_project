const Parking = require("../models/parking.model");

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
async function getRemove(req, res) {}
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

// api routes
async function getAllParkingPlaces(req, res) {
  const parkingPlaces = await Parking.findAll();
  res.json(parkingPlaces);
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
};
