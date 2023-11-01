const { db } = require("../config/db.js");

const _createRating = ({ user_id, device_id, rate }) => {
  console.log("device_id=>", device_id);
  return db("rating").insert({ user_id, device_id, rate }, [
    "id",
    "user_id",
    "device_id",
    "rate",
  ]);
};

const _getOneRating = (device_id) => {
  return db("rating")
    .where("device_id", device_id)
    .avg({ avgRate: "rate" })
    .then((result) => {
      const averageRating = parseFloat(result[0].avgRate).toFixed(2);
      return averageRating;
    });
};

// const _deleteBrand = (id) => {
//   return db("rating")
//     .where({ id })
//     .del()
//     .returning([("id", "name")]);
// };
module.exports = { _createRating, _getOneRating };
