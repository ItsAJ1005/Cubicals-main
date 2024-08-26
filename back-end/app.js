const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectToDB } = require("./database/db");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());

connectToDB();

const authRoutes = require("./routes/authRoutes");
const recruiterRoutes = require('./routes/recruiterRoutes')

app.use("/auth", authRoutes);
app.use("/recruiter",recruiterRoutes)

app.get("/", (req, res) => {
  res.status(200).json({ message: "running" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`app [STARTED] ~ http://localhost:${PORT}`);
});
