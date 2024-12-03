import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import jobController from "../controllers/job.controller.js"; 

const router = express.Router();

// Route to post a new job
router.route("/post").post(isAuthenticated, jobController.postJob);

// Route to get all jobs for students
router.route("/get").get(isAuthenticated, jobController.getAllJobs);

// Route to get all jobs created by the admin (GET method)
router.route("/getadminjobs").get(isAuthenticated, jobController.getAdminJobs);

// Route to get a specific job by ID (GET method)
router.route("/get/:id").get(jobController.getJobById);

// Route to get the count of all jobs (GET method)
router.route("/count").get(jobController.getJobCount); 

export default router;
