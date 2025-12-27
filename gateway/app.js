require("dotenv").config();
const express = require("express");
const expressProxy = require("express-http-proxy");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "gateway",
    timestamp: new Date().toISOString()
  });
});

app.use("/user", expressProxy(process.env.USER_SERVICE_URL));
app.use("/captain", expressProxy(process.env.CAPTAIN_SERVICE_URL));
app.use("/ride", expressProxy(process.env.RIDE_SERVICE_URL));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Gateway is listening on port ${port}`);
});
