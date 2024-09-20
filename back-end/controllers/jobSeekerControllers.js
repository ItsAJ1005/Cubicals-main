const User = require('../models/userModel');
const Job = require('../models/Job');

class JobSeekerController {
    static async applyForJob(req, res) {
        const { jobId } = req.body;
        const userId = req.userId;

        const job = await Job.findById(jobId);
        const user = await User.findById(userId);

        user.jobApplications.push({ jobId });
        await user.save();

        res.status(200).json({ message: "Successfully applied for the job" });
    }

    static async removeAppliedJob(req, res) {
        const { jobId } = req.params;
        const user = await User.findById(req.userId);

        user.jobApplications = user.jobApplications.filter(job => job.jobId.toString() !== jobId);
        await user.save();

        res.status(200).json({ message: "Applied job removed" });
    }
}

module.exports = JobSeekerController;