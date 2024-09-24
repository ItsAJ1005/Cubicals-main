const express = require("express");
const router = express.Router();
const JobSeekerController = require("../controllers/jobSeekerControllers");
const authToken = require("../middlewares/authToken");

router.post(
    "/applyJob",
    authToken,
    JobSeekerController.applyForJob.bind(JobSeekerController)
);

router.delete(
    "/removeAppliedJob/:jobId",
    authToken,
    JobSeekerController.removeAppliedJob.bind(JobSeekerController)
);

router.get(
    "/getUserDetails",
    authToken,
    JobSeekerController.getUserDetails.bind(JobSeekerController)
);

router.post(
    "/saveJob/:jobId",
    authToken,
    JobSeekerController.saveJob.bind(JobSeekerController)
);

router.get(
    "/savedJobs",
    authToken,
    JobSeekerController.viewSavedJobs.bind(JobSeekerController)
);

router.patch(
    "/editSavedJob/:jobId",
    authToken,
    JobSeekerController.editSavedJob.bind(JobSeekerController)
);

module.exports = router;