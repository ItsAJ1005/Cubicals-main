require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectToDB } = require("./database/db");

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
    connectToDB();
  }

  initializeRoutes() {
    const authRoutes = require("./routes/authRoutes");
    const recruiterRoutes = require("./routes/recruiterRoutes");
    const jobSeekerRoutes = require("./routes/jobSeekerRoutes");

    this.app.use("/auth", authRoutes);
    this.app.use("/recruiter", recruiterRoutes);
    this.app.use("/jobSeeker", jobSeekerRoutes);

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

// Instantiate and run the server
const appInstance = new App();
appInstance.listen();
