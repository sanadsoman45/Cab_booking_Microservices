const rideModel = require("../models/ride.model");
const { publishToQueue } = require("../service/rabbit");

const createRide = async (req, res) => {
  try {
    const { pickup, destination } = req.body;
    const newRide = new rideModel({
      user: req.user._id,
      pickup,
      destination,
    });
    await newRide.save();
    publishToQueue("new-ride", JSON.stringify(newRide));
    return res.status(201).json(newRide);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

const acceptRide = async (req, res) => {
  try {
    const { rideId } = req.query;
    const ride = await rideModel.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    ride.status = "accepted";
    await ride.save();
    publishToQueue("ride-accepted", JSON.stringify(ride));
    res.send(ride);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRide,
  acceptRide,
};
