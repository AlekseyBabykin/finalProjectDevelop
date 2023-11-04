const express = require("express");
const t_router = express.Router();
const checkRole = require("../middleware/checkRoleMiddleware.js");
const {
  createType,
  getAllType,
  deleteType,
} = require("../controllers/typeController.js");

t_router.post("/", checkRole("ADMIN"), createType);

t_router.get("/", getAllType);

t_router.delete("/:id", deleteType);

module.exports = { t_router };
