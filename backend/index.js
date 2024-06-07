const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
app.use(cors());

const PORT = 8080 || processs.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("connected to db");
    console.log("server is running");
  });
});
