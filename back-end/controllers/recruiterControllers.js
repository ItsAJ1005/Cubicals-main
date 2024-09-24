const Recruiter = require("../models/recruiterModel");
const Job = require("../models/Job");
const mongoose = require("mongoose");

class RecruiterController {
  static async addJob(req, res) {
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

  static async getJobsByRecruiter(req, res) {
    try {
      const recruiterId = req.userId;
      const recruiter = await Recruiter.findById(recruiterId);


      if (!recruiter) {
        return res.status(404).json({ error: "Recruiter not found" });
      }

      res.status(200).json(recruiter.jobPostings);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve job postings" });
    }
  }

  static async removeJobOpening(req, res) {
    try {
      const { jobId } = req.body;
      const recruiterId = req.userId;

      const recruiterObjectId = new mongoose.Types.ObjectId(recruiterId);

      const job = await Job.findById(jobId);

      if (!job) {
        return res.status(404).json({
          error: "Job not found.",
        });
      }

      if (!job.recruiter.equals(recruiterObjectId)) {
        return res.status(403).json({
          error: "You do not have permission to update this job.",
        });
      }

      job.status = "closed";
      await job.save();

      res
        .status(200)
        .json({ message: "Job status updated to 'closed' successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update job status." });
    }
  }

  static async getJobApplications(req, res) {
    try {
      const { jobId } = req.body;
      const recruiterId = req.userId;
      const job = await Job.findOne({ _id: jobId, recruiter: recruiterId, }).populate("applications.userId", "name email");

      if (!job) {
        return res.status(404).json({
          error:
            "Job not found or you don't have permission to view these applications",
        });
      }

      res.status(200).json(job.applications);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve job applications" });
    }
  }

  static async updateApplicationStatus(req, res) {
    try {
      const { jobId, applicationId } = req.params;
      const { status } = req.body;
      const recruiterId = req.userId;

      const job = await Job.findOne({ _id: jobId, recruiter: recruiterId });

      if (!job) {
        return res.status(404).json({
          error:
            "Job not found or you don't have permission to update this application",
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

module.exports = RecruiterController;