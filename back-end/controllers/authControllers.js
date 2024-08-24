const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Recruiter = require("../models/recruiterModel"); 

exports.UserSignup = async (req, res) => {
  try {
    const { email, password, name, username } = req.body;
    const user = await User.findOne({ email });
    console.log("user", user);

    if (user) {
      throw new Error("Already user exits.");
    }
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    if (!name) {
      throw new Error("Please provide name");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something is wrong");
    }

    const payload = {
      name: name,
      username: username,
      password: hashPassword,
      email: email,
    };

    const userData = new User(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created Successfully!",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

exports.UserSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    console.log("checkPassoword", checkPassword);

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
        role: user.role,
      };
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
        expiresIn: 60 * 60 * 8,
      });

      const tokenOption = {
        httpOnly: true,
        secure: true,
      };

      res.cookie("token", token, tokenOption).status(200).json({
        message: "Login successfully",
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error("Please check Password");
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
exports.userDetails = async (req, res) => {
  try {
    console.log("userId", req.userId);
    const user = await User.findById(req.userId);

    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User details",
    });

    console.log("user", user);
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");

    res.json({
      message: "Logged out successfully",
      error: false,
      success: true,
      data: [],
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

exports.signInRecruiter = async (req, res) => {
  try {
    const { email, password } = req.body;
    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    const isMatch = await bcrypt.compare(password, recruiter.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { _id: recruiter._id, email: recruiter.email, role: "recruiter" },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Sign in successful",
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
    return res.status(500).json({ message: "Server error" });
  }
};

exports.signUpEmployer = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      company,
      companyWebsite,
      contactNumber,
      location,
    } = req.body;

    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({
        message: "Email is already registered.",
        error: true,
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newRecruiter = new Recruiter({
      name,
      email,
      password: hashedPassword,
      company,
      companyWebsite,
      contactNumber,
      location,
    });

    await newRecruiter.save();

    return res.status(201).json({
      message: "Recruiter account created successfully.",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({
      message: "Server error",
      error: true,
      success: false,
    });
  }
};

exports.getEmployerDetails = async (req, res) => {
  try {
    const recruiterId = req.userId;

    const recruiter = await Recruiter.findById(recruiterId).select('-password');

    if (!recruiter) {
      return res.status(404).json({
        message: "Recruiter not found.",
        error: true,
        success: false,
      });
    }

    // Return recruiter details
    return res.status(200).json({
      message: "Recruiter details fetched successfully.",
      recruiter,
      error: false,
      success: true,
    });

  } catch (error) {
    console.error("Get Employer Details Error:", error);
    return res.status(500).json({
      message: "Server error",
      error: true,
      success: false,
    });
  }
};
