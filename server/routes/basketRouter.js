const express = require("express");
const bk_router = express.Router();
const {
  createBasket,
  getBasketDevices,
  deleteBasket,
  deleteBasketDevice,
} = require("../controllers/basketController.js");

bk_router.post("/", createBasket);

bk_router.get("/:id", getBasketDevices);
bk_router.delete("/:id", deleteBasket);
bk_router.delete("/", deleteBasketDevice);

module.exports = { bk_router };
