import express from "express";
import { generateUserReport, login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js"; 


const router = express.Router();

// Route to register a new user (POST method)
router.route("/register").post(singleUpload, register);

// Route for user login (POST method)
router.route("/login").post(login);

// Route for user logout (GET method)
router.route("/logout").get(logout);

// Route to update user profile (POST method)
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);

// Route to generate PDF report for authenticated user
router.get('/report', isAuthenticated, generateUserReport);

export default router;
