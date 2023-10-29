const { db } = require("../config/db.js");

const _getBasketInfo = (user_id) => {
  return db("device")
    .innerJoin("basket", "basket.device_id", "device.id")
    .where("basket.user_id", "=", user_id);
};

const _createBasket = ({ user_id, device_id }) => {
  return db("basket").insert({ user_id, device_id }, [
    "id",
    "user_id",
    "device_id",
  ]);
};

const _getBasketDevices = (user_id) => {
  return db("basket").select("id", "user_id", "device_id").where({ user_id });
};

const _deleteBasketDevice = ({ user_id, device_id }) => {
  return db("basket")
    .where({ user_id: user_id, device_id: device_id })
    .del()
    .limit(1)
    .returning(["id", "user_id", "device_id"]);
};

const _deleteBasket = (id) => {
  return db("basket")
    .where({ id })
    .del()
    .returning(["id", "user_id", "device_id"]);
};

module.exports = {
  _createBasket,
  _getBasketDevices,
  _deleteBasketDevice,
  _deleteBasket,
  _getBasketInfo,
};
