const { db } = require("../config/db.js");

const _createDeviceInfo = async (title, description, device_id) => {
  let response = await db("device_info").insert(
    { title, description, device_id },
    ["id", "title", "description", "device_id"]
  );

  return response;
};

const _getDeviceinfo = (device_id) => {
  return db("device_info")
    .select("id", "title", "description", "device_id")
    .where("device_id", device_id)
    .orderBy("device_id");
};

module.exports = { _createDeviceInfo, _getDeviceinfo };
