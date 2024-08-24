const express = require('express')
const router =  express.Router() ;
const authControllers = require('../controllers/authControllers')
const authToken = require('../middlewares/authToken');
const recruiterToken = require('../middlewares/checkRecruiterRole')
router.post('/UserSignup' , authControllers.UserSignup) 
router.post("/UserSignin",authControllers.UserSignin) 
router.get("/userDetails",authToken,authControllers.userDetails) 
router.get("/userLogout",authControllers.logout)  

router.post("/employerSignin",authControllers.signInRecruiter)
router.post("/signUpEmployer",authControllers.signUpEmployer)
router.get("/getEmployerDetails",recruiterToken,authControllers.getEmployerDetails)

module.exports = router;