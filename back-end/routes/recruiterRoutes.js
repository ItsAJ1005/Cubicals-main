const express = require('express');
const router = express.Router();
const RecruiterController = require('../controllers/recruiterControllers');
const authToken = require('../middlewares/authToken');
const recruiterToken = require('../middlewares/checkRecruiterRole');

router.post('/addJob', authToken, recruiterToken, RecruiterController.addJob);
router.get('/jobs', authToken, recruiterToken, RecruiterController.getJobsByRecruiter);
router.patch('/removeJob', authToken, recruiterToken, RecruiterController.removeJobOpening);
router.get('/jobApplications/:jobId', authToken, recruiterToken, RecruiterController.getJobApplications);
router.put('/updateApplicationStatus/:jobId/:applicationId', authToken, recruiterToken, RecruiterController.updateApplicationStatus);

module.exports = router;