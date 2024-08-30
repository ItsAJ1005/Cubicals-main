const express = require('express');
const router = express.Router();
const jobSeekerControllers = require('../controllers/jobSeekerControllers');
const authToken = require('../middlewares/authToken');

router.post('/applyJob', authToken, jobSeekerControllers.applyForJob);
router.post('/getUserDetails', authToken, jobSeekerControllers.getUserDetails);
router.post('/saveJob/:jobId', authToken, jobSeekerControllers.saveJob);
router.get('/savedJobs', authToken, jobSeekerControllers.viewSavedJobs);
router.put('/editSavedJob/:jobId', authToken, jobSeekerControllers.editSavedJob);
router.delete('/removeAppliedJob/:jobId', authToken, jobSeekerControllers.removeAppliedJob);

module.exports = router;
