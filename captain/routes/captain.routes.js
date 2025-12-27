const express = require("express");
const router = express.Router();
const captainController = require("../controllers/captain.controller");
const authMiddleWare = require("../middleware/authMiddleware");

router.post("/register", captainController.register);
router.post("/login", captainController.login);
router.get("/logout", captainController.logout);
router.get("/profile", authMiddleWare, captainController.profile);
router.put("/isAvailable", authMiddleWare, captainController.toggleAvailability);
router.get("/new-ride", authMiddleWare, captainController.waitForNewRide);

module.exports = router;
