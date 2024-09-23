const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminControllers');

router.get('/job-seekers/count', adminController.countJobSeekers);
router.get('/recruiters/count', adminController.countRecruiters);
router.get('/job-openings/total', adminController.totalJobOpenings);
router.get('/job-domains/count', adminController.countJobDomains);
router.delete('/recruiters/:id', adminController.deleteRecruiter);
router.post('/recruiters', adminController.addRecruiter);
router.delete('/job-seekers/:id', adminController.deleteJobSeeker);

module.exports = router;
