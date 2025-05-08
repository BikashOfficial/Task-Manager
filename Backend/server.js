require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDb = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/userRoutes");
const tasksRoutes = require("./routes/taskRoutes");
const reportsRoutes = require("./routes/reportRoutes");

const app = express();

//Middlware to  handle cors
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true // Add this
  })
);

//connect to database
connectDb();

//middleware
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/tasks", tasksRoutes);
app.use("/api/reports", reportsRoutes);

//serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
