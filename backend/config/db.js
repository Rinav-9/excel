// config/db.js
const mongoose = require("mongoose");
require("dotenv").config(); //.env file to load MONGO_URL

module.exports = () => {
   const mongoURI = process.env.MONGO_URI;

   if (!mongoURI) {
      console.error("MONGO_URL is not defined in .env file");
      process.exit(1); // It stops app is URL missing
   }

   mongoose.connect(mongoURI)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => {
         console.error("MongoDB connection error:", err);
         process.exit(1); // app stops if there is error
      });
};
