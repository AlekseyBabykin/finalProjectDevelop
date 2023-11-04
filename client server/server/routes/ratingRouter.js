const express = require("express");
const r_router = express.Router();
const {
  createRating,
  getOneRating,
} = require("../controllers/ratingController.js");

r_router.post("/", createRating);

r_router.get("/", getOneRating);

module.exports = { r_router };
