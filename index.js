// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Import Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");

dotenv.config();

// Connect to DB
// console.log(typeof process.env.mongodbURL); // string
mongoose.connect(process.env.DB_URL, () => {
  console.log("Connected to DB!");
});

// mongoose.connect(process.env.Read_and_Write_DB_URL, () =>
//   console.log("Connected to DB!")
// );

// Middlewares
app.use(express.json());

// Route Middlewares
app.use("/api/user", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/contacts", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Up and running at port ${PORT}`));
