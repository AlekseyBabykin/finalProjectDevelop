const { _createRating, _getOneRating } = require("../models/rating.models.js");
const { _updateDevice } = require("../models/device.models.js");

const createRating = async (req, res) => {
  console.log("1");
  // const { name } = req.body;
  console.log(req.body);

  const rating = await _createRating(req.body);
  console.log("rating=>", rating);
  const avgRating = await _getOneRating(rating[0].device_id);
  console.log("avgrating=>", avgRating);
  const addAvgDevice = await _updateDevice(avgRating, rating[0].device_id);
  console.log(addAvgDevice);
  res.json(addAvgDevice);
};

const getOneRating = async (req, res) => {
  console.log(req.body);
  const { device_id } = req.body;
  const rating = await _getOneRating(device_id);
  res.json(rating);
};

module.exports = { createRating, getOneRating };
