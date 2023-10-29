const { db } = require("../config/db.js");

const _totalCountDevice = () => {
  return db("device").count("id");
};
const _createDevice = ({ name, price, brand_id, type_id, img: fileName }) => {
  return db("device").insert(
    { name, price, brand_id, type_id, img: fileName },
    ["id", "name", "brand_id", "type_id", "price", "rating", "img"]
  );
};

const _getAllDevice = (brand_id, type_id, limit, page) => {
  page = page || 1;
  limit = limit || 9;
  let offset = page * limit - limit;
  if (!brand_id && !type_id) {
    return db("device")
      .select("id", "name", "brand_id", "type_id", "price", "rating", "img")
      .orderBy("name")
      .limit(limit)
      .offset(offset);
  }
  if (brand_id && !type_id) {
    return db("device")
      .select("id", "name", "brand_id", "type_id", "price", "rating", "img")
      .where({ brand_id })
      .limit(limit)
      .offset(offset);
  }
  if (!brand_id && type_id) {
    return db("device")
      .select("id", "name", "brand_id", "type_id", "price", "rating", "img")
      .where({ type_id })
      .limit(limit)
      .offset(offset);
  }
  if (brand_id && type_id) {
    return db("device")
      .select("id", "name", "brand_id", "type_id", "price", "rating", "img")
      .where({ brand_id, type_id })
      .limit(limit)
      .offset(offset);
  }
};

const _deleteDevice = (id) => {
  return db("device")
    .where({ id })
    .del()
    .returning(["id", "name", "brand_id", "type_id", "price", "rating", "img"]);
};

const _getOneDevice = (id) => {
  return db("device")
    .select("id", "name", "brand_id", "type_id", "price", "rating", "img")
    .where({ id });
};
module.exports = {
  _createDevice,
  _getAllDevice,
  _getOneDevice,
  _deleteDevice,
  _totalCountDevice,
};
