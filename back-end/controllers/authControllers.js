const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Recruiter = require("../models/recruiterModel");

class AuthController {

  async userSignup(req, res) {
    try {
      const { email, password, name, username } = req.body;
      const user = await User.findOne({ email });

      if (user) {
        throw new Error("User already exists.");
      }
      if (!email || !password || !name) {
        throw new Error("Please provide all required fields.");
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hashSync(password, salt);

      const payload = { name, username, password: hashPassword, email };
      const newUser = new User(payload);
      const savedUser = await newUser.save();

      res.status(201).json({
        data: savedUser,
        success: true,
        message: "User created successfully!",
      });
    } catch (err) {
      res.json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  }

  async userSignin(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("Please provide email and password.");
      }

      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found.");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const tokenData = { _id: user._id, email: user.email, role: user.role };
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: '8h' });

        res.cookie("token", token, { httpOnly: true, secure: true }).status(200).json({
          message: "Login successful.",
          data: token,
          success: true,
        });
      } else {
        throw new Error("Invalid password.");
      }
    } catch (err) {
      res.json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  }

  async getUserDetails(req, res) {
    try {
      const user = await User.findById(req.userId);

      res.status(200).json({
        data: user,
        success: true,
        message: "User details fetched successfully.",
      });
    } catch (err) {
      res.status(400).json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie("token");

      res.json({
        message: "Logged out successfully.",
        success: true,
      });
    } catch (err) {
      res.json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
  }

  async signInRecruiter(req, res) {
    try {
      const { email, password } = req.body;
      const recruiter = await Recruiter.findOne({ email });

      if (!recruiter) {
        return res.status(404).json({ message: "Recruiter not found." });
      }

      const isMatch = await bcrypt.compare(password, recruiter.password);
      if (!isMatch) {
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

  async signUpRecruiter(req, res) {
    try {
      const { name, email, password, company, companyWebsite, contactNumber, location } = req.body;

      const existingRecruiter = await Recruiter.findOne({ email });
      if (existingRecruiter) {
        return res.status(400).json({ message: "Email is already registered." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newRecruiter = new Recruiter({
        name, email, password: hashedPassword, company, companyWebsite, contactNumber, location,
      });

      await newRecruiter.save();

      return res.status(201).json({
        message: "Recruiter account created successfully.",
        success: true,
      });
    } catch (error) {
      console.error("Signup Error:", error);
      return res.status(500).json({ message: "Server error." });
    }
  }

  async getRecruiterDetails(req, res) {
    try {
      const recruiter = await Recruiter.findById(req.userId).select('-password');

      if (!recruiter) {
        return res.status(404).json({ message: "Recruiter not found." });
      }

      return res.status(200).json({
        message: "Recruiter details fetched successfully.",
        recruiter,
        success: true,
      });
    } catch (error) {
      console.error("Get Recruiter Details Error:", error);
      return res.status(500).json({ message: "Server error." });
    }
  }
}

module.exports = new AuthController();
