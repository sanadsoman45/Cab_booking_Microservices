require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const connect = require("./config/db.config");
const rabbitMQ = require("./service/rabbit");

rabbitMQ.connect();

const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());

const captainRoutes = require("./routes/captain.routes");
app.use("/", captainRoutes);
app.get("/health", (req, res) => {
  res.send("OK");
});

connect();

const port = process.env.PORT || 3002
app.listen(port, () => {
  console.log(`Captain service is running on ${port}`);
});
