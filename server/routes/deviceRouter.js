const express = require("express");
const d_router = express.Router();
const checkRole = require("../middleware/checkRoleMiddleware.js");
const {
  createDevice,
  getAllDevice,
  getOneDevice,
  deleteDevice,
} = require("../controllers/deviceController.js");

d_router.post("/", checkRole("ADMIN"), createDevice);

d_router.get("/", getAllDevice);
d_router.get("/:id", getOneDevice);
d_router.delete("/:id", deleteDevice);

module.exports = { d_router };
