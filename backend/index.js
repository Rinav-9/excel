const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");

const cors = require('cors');
require("dotenv").config();

const app = express();

app.use(cors({
  origin: [
    'https://excel-analytics-mdr8.onrender.com'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();

app.use("/", authRoutes);
app.use("/", uploadRoutes);
app.use("/", adminRoutes);

const aiRoutes = require("./routes/aiRoutes.js");
app.use("/", aiRoutes);

require('dotenv').config();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

