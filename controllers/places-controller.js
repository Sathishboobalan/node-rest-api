const { uuid } = require("uuidv4");
const HttpError = require("../models/http-error");
const DUMMY_PLACES = [];

const checkPlaceFound = (name, location) =>
  DUMMY_PLACES.some((r) => r.name === name && r.location === location);

const checkPlaceIndex = (placeId) => DUMMY_PLACES.findIndex((r) => r.id === placeId);

const getAllPlaces = (req, res, next) => {
  if (DUMMY_PLACES.length == 0) {
    throw new HttpError(`No Places Found`, 200);
  } else {
    res.json({ data: DUMMY_PLACES });
  }
};

const getAllPlacesCreatedByUser = (req, res, next) => {
  let { userId } = req.params;
  let places = DUMMY_PLACES.filter((r) => r.createdBy === userId);
  if (places.length == 0) {
    throw new HttpError(`No Places Found`, 200);
  } else {
    res.status(200);
    res.json({ data: places });
  }
};

const getPlace = (req, res, next) => {
  let { id } = req.params;
  let indexOfPlace = checkPlaceIndex(id);
  if (indexOfPlace === -1) {
    return next(new HttpError(`No place found to get`, 404));
  }
  res.status(200);
  res.json({ data: DUMMY_PLACES[indexOfPlace] });
};

const updatePlace = (req, res, next) => {
  let { name, location } = req.body;
  let { id } = req.params;
  let indexOfPlace = checkPlaceIndex(id);
  if (indexOfPlace === -1) {
    return next(new HttpError(`No place found to get`, 404));
  }
  let place = DUMMY_PLACES.find((r) => r.id === id);
  place = {
    ...place,
    name,
    location,
  };
  DUMMY_PLACES[indexOfPlace] = place;
  res.status(200);
  res.json({ message: "Place Updated Successfully!!!" });
};

const deletePlace = (req, res, next) => {
  let { id } = req.params;
  let indexOfPlace = checkPlaceIndex(id);
  if (indexOfPlace === -1) {
    return next(new HttpError(`No place found to Delete`, 404));
  }
  DUMMY_PLACES.splice(indexOfPlace, 1);
  res.status(200);
  res.json({ message: "Place Deleted Successfully!!!" });
};

const createPlace = (req, res, next) => {
  let { name, description, location, createdBy } = req.body;
  let placeExist = checkPlaceFound(name, location);
  if (placeExist) {
    return next(new HttpError(`Place already found`, 404));
  }
  let place = {
    name,
    description,
    location,
    createdBy,
    id: uuid(),
  };
  DUMMY_PLACES.push(place);
  res.status(200);
  res.json({ message: "Place Created Successfully!!!" });
};

exports.getAllPlaces = getAllPlaces;
exports.getAllPlacesCreatedByUser = getAllPlacesCreatedByUser;
exports.getPlace = getPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
exports.createPlace = createPlace;