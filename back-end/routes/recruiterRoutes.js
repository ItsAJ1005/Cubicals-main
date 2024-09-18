const express = require('express');
const router = express.Router();
const JobSeekerController = require('../controllers/JobSeekerController');

router.post('/applyJob', authToken, JobSeekerController.applyForJob);
router.delete('/removeAppliedJob/:jobId', authToken, JobSeekerController.removeAppliedJob);

module.exports = router;
