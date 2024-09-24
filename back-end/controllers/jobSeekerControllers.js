const User = require("../models/userModel");
const Job = require("../models/Job");
const sendMail = require("../middlewares/mailer");
class JobSeekerController {

    static async getUserDetails(req, res) {
        try {
            const userId = req.userId;
            const user = await User.findById(userId)
                .populate("jobApplications.jobId")
                .populate("savedJobs.jobId");

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve user details" });
        }
    }

    static async applyForJob(req, res) {
        try {
            const { jobId } = req.body;
            const userId = req.userId;

            const job = await Job.findById(jobId); // Populate recruiter details
            if (!job) {
                return res.status(404).json({ error: "Job not found" });
            }

            const user = await User.findById(userId);
            const alreadyApplied = user.jobApplications.some(
                (application) => application.jobId.toString() === jobId
            );

            if (alreadyApplied) {
                return res.status(400).json({ error: "You have already applied for this job" });
            }

            user.jobApplications.push({ jobId });
            job.applications.push({ userId });

            await user.save();
            await job.save();

            const recruiterEmail = job.recruiter.email; // Assuming recruiter model has an email field
            await sendMail({
                to: recruiterEmail,
                subject: 'New Job Application',
                text: `A new job seeker has applied for your job: ${job.title}.`,
                html: `<p>A new job seeker has applied for your job: <strong>${job.title}</strong>.</p>`,
            });

            res.status(200).json({
                message: "Successfully applied for the job",
                jobApplication: user.jobApplications,
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to apply for the job" });
        }
        // const { jobId } = req.body;
        // const userId = req.userId;
        // res.status(200).json({message: jobId + " " + userId});

    }


    static async saveJob(req, res) {
        try {
            const { jobId } = req.params;
            const userId = req.userId;

            const job = await Job.findById(jobId);
            if (!job) {
                return res.status(404).json({ error: "Job not found" });
            }

            const user = await User.findById(userId);
            const alreadySaved = user.savedJobs.some(
                (savedJob) => savedJob.jobId.toString() === jobId
            );

            if (alreadySaved) {
                return res.status(400).json({ error: "Job already saved" });
            }

            user.savedJobs.push({ jobId });
            await user.save();

            res.status(200).json({
                message: "Job successfully saved",
                savedJobs: user.savedJobs
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to save job" });
        }
    }

    static async viewSavedJobs(req, res) {
        try {
            const userId = req.userId;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.status(200).json({ savedJobs: user.savedJobs });
        } catch (error) {
            res.status(500).json({ error: "Failed to retrieve saved jobs" });
        }
    }

    static async editSavedJob(req, res) {
        try {
            const { jobId } = req.params;
            const { newJobId } = req.body;
            const userId = req.userId;

            const user = await User.findById(userId);
            const savedJobIndex = user.savedJobs.findIndex(savedJob => savedJob.jobId.toString() === jobId);

            if (savedJobIndex === -1) {
                return res.status(404).json({ error: "Saved job not found" });
            }

            user.savedJobs[savedJobIndex].jobId = newJobId;
            await user.save();

            res.status(200).json({
                message: "Saved job updated successfully",
                savedJobs: user.savedJobs
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to update saved job" });
        }
    }

    static async removeAppliedJob(req, res) {
        try {
            const { jobId } = req.params;
            const userId = req.userId;

            const user = await User.findById(userId);
            const appliedJobIndex = user.jobApplications.findIndex(application => application.jobId.toString() === jobId);

            if (appliedJobIndex === -1) {
                return res.status(404).json({ error: "Applied job not found" });
            }

            user.jobApplications.splice(appliedJobIndex, 1);
            await user.save();

            res.status(200).json({
                message: "Applied job removed successfully",
                jobApplications: user.jobApplications
            });
        } catch (error) {
            res.status(500).json({ error: "Failed to remove applied job" });
        }
    }
}

module.exports = JobSeekerController;
