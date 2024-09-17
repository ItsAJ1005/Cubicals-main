const express = require('express');
const router = express.Router();
const RecruiterController = require('../controllers/RecruiterController');

router.post('/addJob', isRecruiter, RecruiterController.addJob);
router.delete('/removeJobOpening/:jobId', isRecruiter, RecruiterController.removeJobOpening);

module.exports = router;
