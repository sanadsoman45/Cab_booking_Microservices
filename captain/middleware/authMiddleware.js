const jwt = require("jsonwebtoken");
const captainModel = require("../models/captain.model");
const blacklistModel = require("../models/blacklisttoken.model");

const captainAuth = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const isBlacklisted = await blacklistModel.find({ token });
    if (isBlacklisted.length) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded.id);

    if (!captain) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.captain = captain;
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports = captainAuth;
