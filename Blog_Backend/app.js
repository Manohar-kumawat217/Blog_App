// here we write our express app

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectToDB = require("./db/db");
const blogPostRoutes = require("./routes/blogPost.route");

//middlewares
const allowedOrigins = [
  "https://blog-app-five-lime.vercel.app",
  "http://localhost:5173",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by cors")); //block request
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], // allowed methods
    credentials: true, // If using cookies/auth
  })
);
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
