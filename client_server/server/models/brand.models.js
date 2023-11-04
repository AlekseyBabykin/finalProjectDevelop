const { db } = require("../config/db.js");

const _createBrand = ({ name }) => {
  return db("brand").insert({ name }, ["id", "name"]);
};

const _getAllBrand = () => {
  return db("brand").select("id", "name").orderBy("name");
};

const _deleteBrand = (id) => {
  return db("brand")
    .where({ id })
    .del()
    .returning([("id", "name")]);
};
module.exports = { _createBrand, _getAllBrand, _deleteBrand };
