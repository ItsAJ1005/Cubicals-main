const Recruiter = require('../models/recruiterModel');
const Job = require('../models/Job');

class RecruiterController {
  static async addJob(req, res) {
    const jobData = { ...req.body, recruiter: req.userId };
    const job = new Job(jobData);

    await job.save();
    res.status(201).json({ message: 'Job added successfully' });
  }

  static async removeJobOpening(req, res) {
    const { jobId } = req.params;
    await Job.deleteById(jobId);

    res.status(200).json({ message: "Job opening removed" });
  }
}

module.exports = RecruiterController;
