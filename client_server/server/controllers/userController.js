const ApiError = require("../error/ApiError.js");
const { _checkUser, _createUser } = require("../models/users.models.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { _createBasket } = require("../models/basket.model.js");
const { request } = require("express");

const userRegistration = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest("not corect email or password"));
    }
    const candidate = await _checkUser(email);
    if (candidate.length === 1) {
      if (candidate[0].email === email) {
        return next(ApiError.badRequest("user alredy exist"));
      }
    }

    const hashPassword = await bcrypt.hash(password + "", 5);

    const user = await _createUser(email, hashPassword, role);
    console.log(user);
    const basket = await _createBasket({ userId: user.id });
    const token = jwt.sign(
      { id: user[0].id, email: user[0].email, role: user[0].role },
      process.env.ACCES_TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    );
    return res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "something went wrong" });
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await _checkUser(email);

    if (user.length === 0) {
      return next(ApiError.internal("user don`t exist"));
    }
    let comparePassword = bcrypt.compareSync(password, user[0].password);
    if (!comparePassword) {
      return next(ApiError.internal("wrong password"));
    }

    const token = jwt.sign(
      { id: user[0].id, email: user[0].email, role: user[0].role },
      process.env.ACCES_TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    );
    return res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "something went wrong" });
  }
};

const userCheck = async (req, res, next) => {
  const user = req.user;
  try {
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.ACCES_TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    );
    return res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "something went wrong" });
  }
};

module.exports = { userRegistration, userCheck, userLogin };
