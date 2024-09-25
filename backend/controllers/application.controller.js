import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import sendMail from "../middlewares/mailer.js";


class ApplicationController {
  // Apply for a job
  async applyJob(req, res, next) {
    try {
      const userId = req.id;
      const jobId = req.params.id;

      if (!jobId) {
        return res.status(400).json({ message: "Job id is required.", success: false });
      }

      const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
      if (existingApplication) {
        return res.status(400).json({ message: "You have already applied for this job.", success: false });
      }

      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found.", success: false });
      }

      const newApplication = await Application.create({ job: jobId, applicant: userId });
      job.applications.push(newApplication._id);
      await job.save();

      const recruiterEmail = job.recruiter.email; // Assuming recruiter model has an email field
      await sendMail({
          to: recruiterEmail,
          subject: 'New Job Application',
          text: `A new job seeker has applied for your job: ${job.title}.`,
          html: `<p>A new job seeker has applied for your job: <strong>${job.title}</strong>.</p>`,
      });

      return res.status(201).json({ message: "Job applied successfully.", success: true });
    } catch (error) {
      next(error); // Use next for error propagation
    }
  }

  // Get applied jobs for the current user
  async getAppliedJobs(req, res, next) {
    try {
      const userId = req.id;
      const applications = await Application.find({ applicant: userId })
        .sort({ createdAt: -1 })
        .populate({
          path: "job",
          populate: {
            path: "company",
          },
        });

      if (applications.length === 0) {
        return res.status(404).json({ message: "No Applications", success: false });
      }

      return res.status(200).json({ applications, success: true });
    } catch (error) {
      next(error);
    }
  }

  // Get all applicants for a specific job
  async getApplicants(req, res, next) {
    try {
      const jobId = req.params.id;
      const job = await Job.findById(jobId).populate({
        path: "applications",
        populate: {
          path: "applicant",
        },
      });

      if (!job) {
        return res.status(404).json({ message: "Job not found.", success: false });
      }

      return res.status(200).json({ job, success: true });
    } catch (error) {
      next(error);
    }
  }

  // Withdraw/Delete Application
async withdrawApplication(req, res) {
  try {
    const applicationId = req.params.id;
    const userId = req.id; // Get the user ID from the request

    const application = await Application.findOneAndDelete({
      _id: applicationId,
      applicant: userId, // Ensure the user can only delete their own application
    });

    if (!application) {
      return res.status(404).json({
        message: "Application not found or you don't have permission to withdraw it.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Application withdrawn successfully.",
      success: true,
    });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error", success: false });
    }
  }

  // Delete Application by Recruiter
async deleteApplication(req, res) {
  try {
    const applicationId = req.params.id;
    const userId = req.id; // Get the user ID from the request

    // Assuming you have a way to check if the user is a recruiter
    const application = await Application.findById(applicationId).populate('job');

    if (!application || application.job.created_by.toString() !== userId.toString()) {
      return res.status(403).json({
        message: "You don't have permission to delete this application.",
        success: false,
      });
    }

    await Application.findByIdAndDelete(applicationId);

    return res.status(200).json({
      message: "Application deleted successfully.",
      success: true,
    });
  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error", success: false });
    }
  }

  // Update Application Status by Recruiter
async updateApplicationStatus(req, res) {
  try {
    const applicationId = req.params.id;
    const { status } = req.body; // Expecting the new status in the request body

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status. It must be 'accepted' or 'rejected'.",
        success: false,
      });
    }

    const application = await Application.findById(applicationId).populate('job');

    if (!application || application.job.created_by.toString() !== req.id) {
      return res.status(403).json({
        message: "You don't have permission to update this application's status.",
        success: false,
      });
    }

    application.status = status;
    await application.save();

    return res.status(200).json({
      message: `Application ${status} successfully.`,
      success: true,
    });
  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error", success: false });
    }
  }


  // Update the status of an application
  async updateStatus(req, res, next) {
    try {
      const { status } = req.body;
      const applicationId = req.params.id;

      if (!status) {
        return res.status(400).json({ message: "Status is required.", success: false });
      }

      const application = await Application.findById(applicationId);
      if (!application) {
        return res.status(404).json({ message: "Application not found.", success: false });
      }

      application.status = status.toLowerCase();
      await application.save();

      return res.status(200).json({ message: "Status updated successfully.", success: true });
    } catch (error) {
      next(error);
    }
  }
}

export default new ApplicationController();
