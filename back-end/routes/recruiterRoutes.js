const express = require('express');
const router = express.Router();
const RecruiterController = require('../controllers/RecruiterController');
const authToken = require('../middlewares/authToken');
const recruiterToken = require('../middlewares/checkRecruiterRole');

router.post('/addJob', authToken, recruiterToken, RecruiterController.addJob.bind(RecruiterController));
router.get('/jobs', authToken, recruiterToken, RecruiterController.getJobsByRecruiter.bind(RecruiterController));
router.delete('/removeJob/:jobId', authToken, recruiterToken, RecruiterController.removeJobOpening.bind(RecruiterController));
router.get('/jobApplications/:jobId', authToken, recruiterToken, RecruiterController.getJobApplications.bind(RecruiterController));
router.put('/updateApplicationStatus/:jobId/:applicationId', authToken, recruiterToken, RecruiterController.updateApplicationStatus.bind(RecruiterController));

module.exports = router;
