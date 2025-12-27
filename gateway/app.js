require("dotenv").config();
const express = require("express");
const expressProxy = require("express-http-proxy");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/user", expressProxy("http://localhost:3001"));
app.use("/captain", expressProxy("http://localhost:3002"));
app.use("/ride", expressProxy("http://localhost:3003"));



const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Gateway is listening on port ${port}`);
});
