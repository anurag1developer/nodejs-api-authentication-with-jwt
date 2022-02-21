// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import Routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");

dotenv.config();

// Connect to DB
// console.log(typeof process.env.mongodbURL); // string
mongoose.connect(process.env.mongodbURL, () => console.log("Connected to DB!"));

// Middlewares
app.use(express.json());

// Route Middlewares
app.use("/api/user", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Up and running at port ${PORT}`));
