// here we write our express app

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectToDB = require("./db/db");
const blogPostRoutes = require("./routes/blogPost.route");

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
connectToDB();

app.use("/blogs", blogPostRoutes);
// here we define our routes

// basic test route
app.get("*", (req, res) => {
  res.status(404).send("Route doesn't exists");
});

module.exports = app;
