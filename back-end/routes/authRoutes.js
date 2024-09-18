const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authControllers'); 
const authToken = require('../middlewares/authToken');
const recruiterToken = require('../middlewares/checkRecruiterRole');

router.post('/userSignup', AuthController.userSignup.bind(AuthController));
router.post('/userSignin', AuthController.userSignin.bind(AuthController));
router.get('/userDetails', authToken, AuthController.getUserDetails.bind(AuthController));
router.get('/userLogout', AuthController.logout.bind(AuthController));

router.post('/recruiterSignin', AuthController.signInRecruiter.bind(AuthController));
router.post('/recruiterSignup', AuthController.signUpRecruiter.bind(AuthController));
router.get('/getRecruiterDetails', recruiterToken, AuthController.getRecruiterDetails.bind(AuthController));

module.exports = router;
