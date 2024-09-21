const CollaborativeJob = require("../models/CollaborativeJobModel");
const Job = require("../models/Job");

class CollaborationController {
  // Enroll a company in collaboration pool
  static async enrollInCollaboration(req, res) {
    const { jobTitle, jobDescription } = req.body;

    const newCollaborativeJob = new CollaborativeJob({
      jobTitle,
      jobDescription,
      companies: [req.userId], // req
    });

    try {
      await newCollaborativeJob.save();
      res.status(201).json({
        message: "Successfully enrolled in collaboration",
        job: newCollaborativeJob,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error enrolling in collaboration",
        error,
      });
    }
  }

  // Get the collaboration pool (excluding requests data)
  static async getCollaborationPool(req, res) {
    try {
      const pool = await CollaborativeJob.find()
        .select("-collaborationRequests") // Exclude the requests data for privacy
        .populate("companies", "name email company companyWebsite location"); // Populate recruiter details
      res.status(200).json(pool);
    } catch (error) {
      res.status(500).json({
        message: "Error retrieving collaboration pool",
        error,
      });
    }
  }

  // Send a collaboration request
  static async sendCollaborationRequest(req, res) {
    const { collaborationId } = req.params;

    try {
      const collaboration = await CollaborativeJob.findById(collaborationId);
      if (!collaboration) {
        return res.status(404).json({ message: "Collaboration not found" });
      }

      collaboration.collaborationRequests.push({
        requester: req.userId, // The recruiter sending the request
      });
      await collaboration.save();

      res.status(200).json({
        message: "Collaboration request sent",
      });
    } catch (error) {
      res.status(500).json({
        message: "Error sending collaboration request",
        error,
      });
    }
  }

  // Update the status of a collaboration request
  static async updateCollaborationRequest(req, res) {
    const { collaborationId, requestId } = req.params;
    const { status } = req.body; // 'pending', 'accepted', or 'rejected'

    try {
      const collaboration = await CollaborativeJob.findById(collaborationId);
      if (!collaboration) {
        return res.status(404).json({ message: "Collaboration not found" });
      }

      const request = collaboration.collaborationRequests.id(requestId);
      if (request) {
        request.status = status;
        await collaboration.save();

        res.status(200).json({ message: "Collaboration request updated" });

        // If accepted, remove collaboration from pool and create a new job
        if (status === "accepted") {
          await CollaborationController.createJobFromCollaboration(req, res);
        }
      } else {
        res.status(404).json({ message: "Request not found" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Error updating collaboration request",
        error,
      });
    }
  }

  // Create a job from the collaboration
  static async createJobFromCollaboration(req, res) {
    const { collaborationId } = req.params;

    try {
      const collaboration = await CollaborativeJob.findById(collaborationId)
        .populate("companies", "name email company")
        .exec();
      
      if (!collaboration) {
        return res.status(404).json({ message: "Collaboration not found" });
      }

      // Create a new job by collaborating companies
      const newJob = new Job({
        title: collaboration.jobTitle,
        description: collaboration.jobDescription,
        requirements: "To be determined", // You can modify this based on your requirements
        salary: 50000, // You can add logic to set an appropriate salary
        recruiter: collaboration.companies, // Associate both companies as recruiters
        openings: 5, // You can adjust this value
      });

      await newJob.save();

      // Optionally, remove the collaboration from the pool
      await CollaborativeJob.findByIdAndDelete(collaborationId);

      res.status(201).json({
        message: "Job created successfully from collaboration",
        job: newJob,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error creating job from collaboration",
        error,
      });
    }
  }
}

module.exports = CollaborationController;
