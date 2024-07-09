const jwt = require("jsonwebtoken");
require("dotenv").config();
// middleWare
const jwtAuthMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json("Token Not found");
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.secret_key);
    req.users = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ Error: "Internal Server Error" });
  }
};
const generateToken = (userDate) => {
  return jwt.sign(userDate, process.env.secret_key);
};

module.exports = { jwtAuthMiddleware, generateToken };
