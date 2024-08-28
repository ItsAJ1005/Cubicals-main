const User = require('../models/userModel');
const Job = require('../models/Job');

exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.userId;      
        const user = await User.findById(userId).populate('jobApplications.jobId').populate('savedJobs.jobId');

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve user details" });
    }
};

exports.applyForJob = async (req, res) => {
    try {
        const { jobId } = req.body;
        const userId = req.userId;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        const user = await User.findById(userId);
        const alreadyApplied = user.jobApplications.some(application => application.jobId.toString() === jobId);

        if (alreadyApplied) {
            return res.status(400).json({ error: "You have already applied for this job" });
        }

        user.jobApplications.push({ jobId });
        await user.save();

        res.status(200).json({ message: "Successfully applied for the job", jobApplication: user.jobApplications });
    } catch (error) {
        res.status(500).json({ error: "Failed to apply for the job" });
    }
};

exports.saveJob = async (req, res) => {
    try {
        const { jobId } = req.params; 
        const userId = req.userId;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        const user = await User.findById(userId);
        const alreadySaved = user.savedJobs.some(savedJob => savedJob.jobId.toString() === jobId);

        if (alreadySaved) {
            return res.status(400).json({ error: "Job already saved" });
        }

        user.savedJobs.push({ jobId });
        await user.save();

        res.status(200).json({ message: "Job successfully saved", savedJobs: user.savedJobs });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: "Failed to save job" });
    }
};
exports.viewSavedJobs = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId).populate('savedJobs.jobId');

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ savedJobs: user.savedJobs });
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve saved jobs" });
    }
};