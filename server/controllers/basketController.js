const {
  _createBasket,
  _getBasketDevices,
  _deleteBasketDevice,
  _deleteBasket,
  _getBasketInfo,
} = require("../models/basket.model.js");

const createBasket = async (req, res) => {
  try {
    const data = await _createBasket(req.body);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: error.message });
  }
};

const getBasketDevices = async (req, res) => {
  try {
    const data = await _getBasketInfo(req.params.id);
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: error.message });
  }
};

const deleteBasketDevice = async (req, res) => {
  try {
    console.log(req.body);
    const data = await _deleteBasketDevice(req.body);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: error.message });
  }
};
const deleteBasket = async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await _deleteBasket(req.params.id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: error.message });
  }
};

module.exports = {
  createBasket,
  getBasketDevices,
  deleteBasket,
  deleteBasketDevice,
};
