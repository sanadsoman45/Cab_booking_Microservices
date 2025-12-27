require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const connectDB = require("./config/db.config");
const rabbitMQ = require("./service/rabbit");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

const rideRoutes = require("./routes/ride.route");
app.use("/", rideRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "gateway",
    timestamp: new Date().toISOString()
  });
});


const startServer = async () => {
  try {
    await connectDB();
    await rabbitMQ.connect();

    const port = process.env.PORT || 3003;
    app.listen(port, () => {
      console.log(`Ride service running on port ${port}`);
    });
  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
};

startServer();
