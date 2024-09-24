require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./database/db");

class App {
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.connectToDatabase();
    this.initializeRoutes();
  }

  initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(cors());
  }

  connectToDatabase() {
    db.connect();
  }

  initializeRoutes() {
    const authRoutes = require("./routes/authRoutes")
    const recruiterRoutes = require("./routes/recruiterRoutes")
    const jobSeekerRoutes = require("./routes/jobSeekerRoutes")
    const adminRoutes = require("./routes/adminRoutes")

    this.app.use("/auth", authRoutes);
    this.app.use("/recruiter", recruiterRoutes);
    this.app.use("/jobSeeker", jobSeekerRoutes);
    this.app.use("/admin", adminRoutes)
    this.app.get("/", (req, res) => {
      res.status(200).json({ message: "Server running" });
    });
  }

  listen() {
    const PORT = process.env.PORT || 8000;
    this.app.listen(PORT, () => {
      console.log(`App [STARTED] ~ http://localhost:${PORT}`);
    });
  }
}

const appInstance = new App();
appInstance.listen();