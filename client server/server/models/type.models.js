const { db } = require("../config/db.js");

const _createType = ({ name }) => {
  return db("type").insert({ name }, ["id", "name"]);
};

const _getAllType = () => {
  return db("type").select("id", "name").orderBy("name");
};

const _deleteType = (id) => {
  return db("type").where({ id }).del().returning(["id", "name"]);
};
module.exports = { _createType, _getAllType, _deleteType };
