const ApiError = require("../error/ApiError.js");
const {
  _createBrand,
  _getAllBrand,
  _deleteBrand,
} = require("../models/brand.models.js");

const createBrand = async (req, res) => {
  //   const { name } = req.body;
  const brand = await _createBrand(req.body);
  res.json(brand);
};

const getAllBrand = async (req, res) => {
  const brand = await _getAllBrand();
  res.json(brand);
};

const deleteBrand = async (req, res) => {
  const { id } = req.params;

  const brand = await _deleteBrand(id);
  res.json(brand);
};

module.exports = { createBrand, getAllBrand, deleteBrand };
