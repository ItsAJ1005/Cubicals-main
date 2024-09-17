const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Recruiter = require("../models/recruiterModel");

class AuthController {

  // User signup
  async userSignup(req, res) {
    try {
      const { email, password, name, username } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new Error("User already exists.");
      }
      if (!email || !password || !name) {
        throw new Error("All fields are required.");
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hashSync(password, salt);

      if (!hashPassword) {
        throw new Error("Error while hashing password.");
      }

      const userData = new User({
        name,
        username,
        email,
        password: hashPassword,
      });

      const savedUser = await userData.save();

      res.status(201).json({
        data: savedUser,
        success: true,
        error: false,
        message: "User created successfully!",
      });
    } catch (error) {
      res.json({
        message: error.message || error,
        error: true,
        success: false,
      });
    }
  }

  // User sign in
  async userSignin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("Email and password are required.");
      }

      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found.");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid credentials.");
      }

      const token = jwt.sign(
        { _id: user._id, email: user.email, role: user.role },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: "8h" }
      );

      res.cookie("token", token, { httpOnly: true, secure: true }).status(200).json({
        message: "Login successful.",
        data: token,
        success: true,
        error: false,
      });
    } catch (error) {
      res.json({
        message: error.message || error,
        error: true,
        success: false,
      });
    }
  }

  // Get user details
  async getUserDetails(req, res) {
    try {
      const user = await User.findById(req.userId);

      res.status(200).json({
        data: user,
        success: true,
        error: false,
        message: "User details fetched successfully.",
      });
    } catch (error) {
      res.status(400).json({
        message: error.message || error,
        error: true,
        success: false,
      });
    }
  }

  // User logout
  async logout(req, res) {
    try {
      res.clearCookie("token").json({
        message: "Logged out successfully.",
        success: true,
        error: false,
      });
    } catch (error) {
      res.json({
        message: error.message || error,
        error: true,
        success: false,
      });
    }
  }

  // Recruiter sign in
  async signInRecruiter(req, res) {
    try {
      const { email, password } = req.body;
      const recruiter = await Recruiter.findOne({ email });

      if (!recruiter) {
        return res.status(404).json({ message: "Recruiter not found." });
      }

      const isPasswordValid = await bcrypt.compare(password, recruiter.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials." });
      }

      const token = jwt.sign(
        { _id: recruiter._id, email: recruiter.email, role: "recruiter" },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Sign in successful.",
        token,
        recruiter: {
          id: recruiter._id,
          name: recruiter.name,
          email: recruiter.email,
          company: recruiter.company,
        },
      });
    } catch (error) {
      console.error("Sign-In Error:", error);
      return res.status(500).json({ message: "Server error." });
    }
  }

  // Recruiter signup
  async signUpRecruiter(req, res) {
    try {
      const { name, email, password, company, companyWebsite, location } = req.body;

      const existingRecruiter = await Recruiter.findOne({ email });
      if (existingRecruiter) {
        return res.status(400).json({ message: "Email is already registered." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newRecruiter = new Recruiter({
        name,
        email,
        password: hashedPassword,
        company,
        companyWebsite,
        location,
      });

      await newRecruiter.save();

      return res.status(201).json({ message: "Recruiter account created successfully." });
    } catch (error) {
      console.error("Signup Error:", error);
      return res.status(500).json({ message: "Server error." });
    }
  }

  // Get recruiter details
  async getRecruiterDetails(req, res) {
    try {
      const recruiterId = req.userId;
      const recruiter = await Recruiter.findById(recruiterId).select('-password');

      if (!recruiter) {
        return res.status(404).json({ message: "Recruiter not found." });
      }

      return res.status(200).json({
        message: "Recruiter details fetched successfully.",
        recruiter,
        success: true,
        error: false,
      });
    } catch (error) {
      console.error("Get Employer Details Error:", error);
      return res.status(500).json({ message: "Server error." });
    }
  }
}

module.exports = new AuthController();
