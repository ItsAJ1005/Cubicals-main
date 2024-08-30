
const Job = require("../models/Job");
const Recruiter = require("../models/recruiterModel");

exports.addJob = async (req, res) => {
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
};

exports.getJobsByRecruiter = async (req, res) => {
  try {
    const recruiterId = req.userId;

    const jobs = await Job.find({ recruiter: recruiterId });

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve job postings" });
  }
};

exports.removeJobOpening = async (req, res) => {
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
};
