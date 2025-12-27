const captainModel = require("../models/captain.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklisttokenModel = require("../models/blacklisttoken.model");
const {subscribeToQueue} = require("../service/rabbit");
const pendingRequests = [];

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const captain = await captainModel.findOne({ email });

    if (captain) {
      return res.status(500).json({ msg: "captain Already exists" });
    }
    const hash = await bcrypt.hash(password, 10);
    const newcaptain = new captainModel({ name, email, password: hash });
    await newcaptain.save();
    const token = jwt.sign({ id: newcaptain._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token);
    delete newcaptain._doc.password;
    res.send({ token, newcaptain });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select("+password");

    if (!captain) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, captain.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    delete captain._doc.password;

    res.cookie("token", token);

    res.send({ token, captain });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.cookies.token;
    await blacklisttokenModel.create({ token });
    res.clearCookie("token");
    res.send({ message: "captain logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const profile = async (req, res) => {
  try {
    const captain = req.captain.toObject();
    delete captain.password;
    res.json(captain);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const toggleAvailability = async (req, res) => {
  try {
    const captain = await captainModel.findById(req.captain._id);
    captain.isAvailable = !captain.isAvailable;
    await captain.save();
    res.send(captain);
  } catch (error) {
    console.error(error);
  }
};

waitForNewRide = async (req, res) => {

    req.setTimeout(30000, () => {
        res.status(204).end(); 
    });

   
    pendingRequests.push(res);
};

subscribeToQueue("new-ride", (data) => {
    const rideData = JSON.parse(data);

    pendingRequests.forEach(res => {
        res.json(rideData);
    });

    pendingRequests.length = 0;
});

module.exports = {
  register,
  login,
  logout,
  profile,
  toggleAvailability,
  waitForNewRide
};
