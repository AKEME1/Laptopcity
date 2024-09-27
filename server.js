const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });

const app = require("./app");

// console.log(process.env);
const db = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(db).then(() => {
  console.log("DB connection successful!");
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is started in port ${PORT}`);
});
