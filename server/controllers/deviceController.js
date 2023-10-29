const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError.js");
const {
  _createDeviceInfo,
  _getDeviceinfo,
} = require("../models/deviceInfo.model.js");
const {
  _createDevice,
  _getAllDevice,
  _getOneDevice,
  _deleteDevice,
  _totalCountDevice,
} = require("../models/device.models.js");
const { log } = require("console");

const createDevice = async (req, res, next) => {
  try {
    let { name, price, brand_id, type_id, info } = req.body;
    console.log(req.body);
    const { img } = req.files;

    let fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", fileName));

    const device = await _createDevice({
      name,
      price,
      brand_id,
      type_id,
      img: fileName,
    });

    parseinfo = JSON.parse(info);

    if (parseinfo.length !== 0) {
      info = parseinfo;

      parseinfo.forEach((i) =>
        _createDeviceInfo(i.title, i.description, device[0].id)
      );
    }

    res.json(device);
  } catch (e) {
    next(ApiError.badRequest(e.message));
  }
};
const getAllDevice = async (req, res) => {
  const { brand_id, type_id, limit, page } = req.query;

  let devices = await _getAllDevice(brand_id, type_id, limit, page);
  let allDevices = {};
  allDevices.count = devices.length;
  allDevices.rows = devices;
  return res.json(allDevices);
};

const getOneDevice = async (req, res) => {
  const id = req.params.id;
  const device = await _getOneDevice(id);
  console.log("device.id", id);
  const device_info = await _getDeviceinfo(id);
  console.log(device);
  device[0].info = device_info;
  console.log(device);
  res.json(device);
};

const deleteDevice = async (req, res) => {
  const id = req.params.id;
  const device = await _deleteDevice(id);
  res.json(device);
};

module.exports = { createDevice, getAllDevice, getOneDevice, deleteDevice };
