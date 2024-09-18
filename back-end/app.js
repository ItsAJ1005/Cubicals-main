require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./database/db"); // Import the db instance

class App {
  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.connectToDatabase();
    this.initializeRoutes();
  }

  // Initialize middlewares
  initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(cors());
  }

  // Connect to the database
  connectToDatabase() {
    db.connect(); // Use the connect method from the db instance
  }

  // Initialize routes
  initializeRoutes() {
    const authRoutes = require("./routes/authRoutes");
    const recruiterRoutes = require("./routes/recruiterRoutes");
    const jobSeekerRoutes = require("./routes/jobSeekerRoutes");

    this.app.use("/auth", authRoutes);
    this.app.use("/recruiter", recruiterRoutes);
    this.app.use("/jobSeeker", jobSeekerRoutes);

    // Base route
    this.app.get("/", (req, res) => {
      res.status(200).json({ message: "Server running" });
    });
  }

  // Start the server
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
