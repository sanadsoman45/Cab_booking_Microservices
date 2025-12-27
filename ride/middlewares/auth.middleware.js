const jwt = require("jsonwebtoken");
const axios = require("axios");

const userAuth = async (req, res, next) => {
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
      return res.status(401).json({ message: "UnAuthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const response = await axios.get(`${process.env.BASE_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = response.data;
    if (!user) {
      return res.status(401).json({ message: "UnAuthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

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
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const response = await axios.get(
      `${process.env.BASE_URL}/captain/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const captain = response.data;

    if (!captain) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.captain = captain;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  userAuth,
  captainAuth,
};
