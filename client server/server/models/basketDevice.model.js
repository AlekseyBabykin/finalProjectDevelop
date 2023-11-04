const { db } = require("../config/db.js");

const _createBascetDevice = ({ device_id }) => {
  return db("basket").insert({ device_id }), ["id", "device_id", "basket_id"];
};
const _deleteBascetDevice = (id) => {
  return db("basket_device")
    .where({ id })
    .del()
    .rerurning(["id", "device_id", "basket_id"]);
};

module.exports = {
  _createBascetDevice,
  _deleteBascetDevice,
};
