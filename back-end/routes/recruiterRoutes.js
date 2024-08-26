const express = require('express')
const router = express.Router()
const recruiterController = require('../controllers/recruiterControllers')
const isRecruiter = require('../middlewares/checkRecruiterRole')


router.post('/addOpenings',isRecruiter,recruiterController.addJob)
router.get('/getJobsByRecruiter',isRecruiter,recruiterController.getJobsByRecruiter)

module.exports = router 