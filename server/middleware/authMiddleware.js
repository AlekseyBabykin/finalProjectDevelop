const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "not authorization" });
    }
    const decode = jwt.verify(token, process.env.ACCES_TOKEN_SECRET);
    req.user = decode;
    next();
  } catch (e) {
    res.status(401).json({ message: "not authorization" });
  }
};
