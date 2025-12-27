const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklisttokenModel = require("../models/blacklisttoken.model");
const { subscribeToQueue } = require("../service/rabbit");
const EventEmitter = require("events");

const rideEventEmitter = new EventEmitter();

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(500).json({ msg: "User Already exists" });
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = new userModel({ name, email, password: hash });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token);
    delete newUser._doc.password;
    res.send({ token, newUser });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    delete user._doc.password;

    res.cookie("token", token);

    res.send({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.cookies.token;
    await blacklisttokenModel.create({ token });
    res.clearCookie("token");
    res.send({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const profile = async (req, res) => {
  try {
    const user = req.user.toObject();
    delete user.password;
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const acceptedRide = async (req, res) => {
  let responded = false;

  const onRideAccepted = (data) => {
    if (responded) return;

    responded = true;
    clearTimeout(timeout);
    res.status(200).json(data);
  };

  rideEventEmitter.once("ride-accepted", onRideAccepted);

  const timeout = setTimeout(() => {
    if (responded) return;

    responded = true;
    rideEventEmitter.removeListener("ride-accepted", onRideAccepted);
    res.status(204).send();
  }, 30000);
};

subscribeToQueue("ride-accepted", async (msg) => {
  const data = JSON.parse(msg);
  rideEventEmitter.emit("ride-accepted", data);
});

module.exports = {
  register,
  login,
  logout,
  profile,
  acceptedRide,
};
