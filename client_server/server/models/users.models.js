const { db } = require("../config/db.js");

const _checkUser = (email) => {
  return db("user").select("id", "email", "password", "role").where({ email });
};

const _createUser = (email, password, role) => {
  return db("user")
    .insert({ email, password, role })
    .returning(["id", "email", "role"])
    .onConflict("email")
    .ignore();
};

module.exports = { _checkUser, _createUser };
