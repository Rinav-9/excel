// config/db.js
const mongoose = require("mongoose");
require("dotenv").config(); // 👈 ये जरूरी है .env file से MONGO_URL लोड करने के लिए

module.exports = () => {
   const mongoURI = process.env.MONGO_URI;

   if (!mongoURI) {
      console.error("MONGO_URL is not defined in .env file");
      process.exit(1); // Optional: app को stop कर देगा अगर URL missing हो
   }

   mongoose.connect(mongoURI)
      .then(() => console.log("MongoDB connected"))
      .catch((err) => {
         console.error("MongoDB connection error:", err);
         process.exit(1); // Optional: error आने पर app बंद कर देगा
      });
};
