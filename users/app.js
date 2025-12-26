require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const connect = require("./config/db.config");

const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());

const userRoutes = require("./routes/user.routes");
app.use("/", userRoutes);
app.get("/health", (req, res) => {
  res.send("OK");
});

connect();

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`User service is running on ${port}`);
});
