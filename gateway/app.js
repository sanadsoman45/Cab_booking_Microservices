require("dotenv").config();
const express = require("express");
const expressProxy = require("express-http-proxy");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// forward /user → user service
app.use("/user", expressProxy("http://localhost:3001"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Gateway is listening on port ${port}`);
});
