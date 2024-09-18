const Job = require("../models/Job");
const Recruiter = require("../models/recruiterModel");

class RecruiterController {

  // Add Job
  async addJob(req, res) {
    try {
      const { title, description, requirements, location, salary, openings } = req.body;

      const newJob = new Job({
        title,
        description,
        requirements,
        location,
        salary,
        openings,
        recruiter: req.userId,
      });

      const savedJob = await newJob.save();

      const recruiter = await Recruiter.findById(req.userId);
      recruiter.jobPostings.push(savedJob._id);
      await recruiter.save();

      res.status(201).json(savedJob);
    } catch (error) {
      res.status(500).json({ error: "Failed to create job" });
    }
  }

  // Get Jobs by Recruiter
  async getJobsByRecruiter(req, res) {
    try {
      const recruiterId = req.userId;
      const jobs = await Job.find({ recruiter: recruiterId });
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve job postings" });
    }
  }

  // Remove Job Opening
  async removeJobOpening(req, res) {
    try {
      const { jobId } = req.params;
      const recruiterId = req.userId;

      const job = await Job.findOneAndDelete({ _id: jobId, recruiter: recruiterId });

      if (!job) {
        return res.status(404).json({ error: "Job not found or you do not have permission to delete this job." });
      }

      await Recruiter.updateOne(
        { _id: recruiterId },
        { $pull: { jobPostings: jobId } }
      );

      res.status(200).json({ message: "Job opening removed successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to remove job opening" });
    }
  }

  // Get Job Applications
  async getJobApplications(req, res) {
    try {
      const { jobId } = req.params;
      const recruiterId = req.userId;
      const job = await Job.findOne({
        _id: jobId,
        recruiter: recruiterId,
      }).populate("applications.userId", "name email");

      if (!job) {
        return res.status(404).json({
          error: "Job not found or you don't have permission to view these applications",
        });
      }

      res.status(200).json(job.applications);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve job applications" });
    }
  }

  // Update Application Status
  async updateApplicationStatus(req, res) {
    try {
      const { jobId, applicationId } = req.params;
      const { status } = req.body;
      const recruiterId = req.userId;

      const job = await Job.findOne({ _id: jobId, recruiter: recruiterId });

      if (!job) {
        return res.status(404).json({
          error: "Job not found or you don't have permission to update this application",
        });
      }

      const application = job.applications.id(applicationId);
      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }

      application.status = status;
      await job.save();

      res.status(200).json({ message: `Application ${status} successfully` });
    } catch (error) {
      res.status(500).json({ error: "Failed to update application status" });
    }
  }
}

module.exports = new RecruiterController();
