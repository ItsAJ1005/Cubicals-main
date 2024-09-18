const express = require('express');
const router = express.Router();
const JobSeekerController = require('../controllers/jobSeekerControllers')
const authToken = require('../middlewares/authToken')


router.post('/applyJob', authToken, JobSeekerController.applyForJob);
router.delete('/removeAppliedJob/:jobId', authToken, JobSeekerController.removeAppliedJob);

module.exports = router;
