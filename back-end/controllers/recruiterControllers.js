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
