require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");


const users = require("./models/userSchema");
const cors = require("cors");
const router = require("./routes/router");

// Define port variable
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});