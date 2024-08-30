const express = require('express')
const router = express.Router()
const recruiterController = require('../controllers/recruiterControllers')
const isRecruiter = require('../middlewares/checkRecruiterRole')


router.post('/addOpenings', isRecruiter, recruiterController.addJob);
router.get('/getJobsByRecruiter', isRecruiter, recruiterController.getJobsByRecruiter);
router.delete('/removeJobOpening/:jobId', isRecruiter, recruiterController.removeJobOpening);


module.exports = router 