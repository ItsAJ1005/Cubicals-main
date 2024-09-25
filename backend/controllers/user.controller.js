import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Simple email validation regex
//format: something@something.something
const simpleEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Simple password validation regex

// This regex enforces the following rules:
// - Minimum 8 characters
// - At least one lowercase letter
// - At least one uppercase letter
// - At least one digit
// - At least one special character (like @, #, $, etc.)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

class UserController {
    // Register a new user
    async register(req, res, next) {
        try {
            const { fullname, email, phoneNumber, password, role } = req.body;

            // Validate email format
            if (!simpleEmailRegex.test(email)) {
                return res.status(400).json({ message: "Invalid email, format: something@something.something", success: false });
            }

            // Validate password strength
            if (!passwordRegex.test(password)) {
                return res.status(400).json({ message: "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.", success: false });
            }

            // Check for missing fields
            if (!fullname || !phoneNumber || !password || !role) {
                return res.status(400).json({ message: "Something is missing", success: false });
            }

            // Check for file upload
            const file = req.file;
            let cloudResponse;
            if (file) {
                const fileUri = getDataUri(file);
                cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists with this email.", success: false });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                fullname,
                email,
                phoneNumber,
                password: hashedPassword,
                role,
                profile: {
                    profilePhoto: cloudResponse ? cloudResponse.secure_url : null, // Handle photo upload conditionally
                },
            });

            return res.status(201).json({ message: "Account created successfully.", success: true });
        } catch (error) {
            next(error); // Propagate errors to the error handler
        }
    }

    // Login a user
    async login(req, res, next) {
        try {
            const { email, password, role } = req.body;

            // Validate email format
            if (!simpleEmailRegex.test(email)) {
                return res.status(400).json({ message: "Invalid email format.", success: false });
            }

            // Check for missing fields
            if (!email || !password || !role) {
                return res.status(400).json({ message: "Something is missing", success: false });
            }

            const user = await User.findOne({ email });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(400).json({ message: "Incorrect email or password.", success: false });
            }

            // Check if role is correct
            if (role !== user.role) {
                return res.status(400).json({ message: "Account doesn't exist with the current role.", success: false });
            }

            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });

            return res
                .status(200)
                .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
                .json({
                    message: `Welcome back ${user.fullname}`,
                    user: this.getUserResponse(user),
                    success: true,
                });
        } catch (error) {
            next(error);
        }
    }

    // Logout user
    async logout(req, res, next) {
        try {
            return res.status(200).cookie("token", "", { maxAge: 0 }).json({
                message: "Logged out successfully.",
                success: true,
            });
        } catch (error) {
            next(error);
        }
    }

    // Update user profile
    async updateProfile(req, res, next) {
        try {
            const { fullname, email, phoneNumber, bio, skills } = req.body;
            const file = req.file;
            let cloudResponse;
            const userId = req.id;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(400).json({ message: "User not found.", success: false });
            }

            // Update user data
            if (fullname) user.fullname = fullname;
            if (email) user.email = email;
            if (phoneNumber) user.phoneNumber = phoneNumber;
            if (bio) user.profile.bio = bio;
            if (skills) user.profile.skills = skills.split(",");

            // Handle profile photo upload
            if (file) {
                const fileUri = getDataUri(file);
                cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                user.profile.resume = cloudResponse.secure_url; // Save Cloudinary URL
                user.profile.resumeOriginalName = file.originalname; // Save original file name
            }

            await user.save();

            return res.status(200).json({
                message: "Profile updated successfully.",
                user: this.getUserResponse(user),
                success: true,
            });
        } catch (error) {
            next(error);
        }
    }

    // Helper function to format user response
    getUserResponse(user) {
        return {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };
    }

    // Bind methods to the class instance
    register = this.register.bind(this);
    login = this.login.bind(this);
    logout = this.logout.bind(this);
    updateProfile = this.updateProfile.bind(this);
}

const userController = new UserController();
export const { register, login, logout, updateProfile } = userController;
