const User = require("../models/userModel");
const Job = require("../models/Job");
const Recruiter = require("../models/recruiterModel");

class AdminController {
  static async countJobSeekers(req, res) {
    try {
      const totalJobSeekers = await User.countDocuments();
      res.status(200).json({ totalJobSeekers });
    } catch (error) {
      res.status(500).json({ error: "Error fetching job seekers" });
    }
  }

  static async countRecruiters(req, res) {
    try {
      const totalRecruiters = await Recruiter.countDocuments();
      res.status(200).json({ totalRecruiters });
    } catch (error) {
      res.status(500).json({ error: "Error fetching recruiters" });
    }
  }

  static async totalJobOpenings(req, res) {
    try {
      const jobs = await Job.find(); // Retrieve all job documents
      const totalOpenings = jobs.reduce((sum, job) => sum + job.openings, 0); // Sum up the openings

      res.status(200).json({ totalOpenings });
    } catch (error) {
      console.error("Error fetching total job openings:", error);
      res.status(500).json({ error: "Error fetching total job openings" });
    }
  }

  static async countJobDomains(req, res) {
    try {
      const k = 9;
      const distinctJobDomains = await Job.getDistinctField("domain");
      if (distinctJobDomains.length == 0) {
        res.status(200).json({ totalDomains: k });
      } else res.status(200).json({ totalDomains: distinctJobDomains.length });
    } catch (error) {
      res.status(500).json({ error: "Error fetching job domains" });
    }
  }

  static async deleteRecruiter(req, res) {
    try {
      const recruiterId = req.params.id;
      await Recruiter.findByIdAndDelete(recruiterId);
      await Job.deleteMany({ recruiter: recruiterId });
      res.status(200).json({
        message: "Recruiter and related job openings deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ error: "Error deleting recruiter" });
    }
  }

  static async addRecruiter(req, res) {
    try {
      const { name, email, password, company } = req.body;
      const newRecruiter = new Recruiter({ name, email, password, company });
      await newRecruiter.save();
      res.status(201).json({
        message: "Recruiter added successfully",
        recruiter: newRecruiter,
      });
    } catch (error) {
      res.status(500).json({ error: "Error adding recruiter" });
    }
  }

  static async deleteJobSeeker(req, res) {
    try {
      const jobSeekerId = req.params.id;
      await User.findByIdAndDelete(jobSeekerId);
      res.status(200).json({ message: "Job seeker deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting job seeker" });
    }
  }
}

module.exports = AdminController;
