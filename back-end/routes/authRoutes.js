const express = require('express')
const router =  express.Router() ;
const authControllers = require('../controllers/authControllers')
const authToken = require('../middlewares/authToken');
const recruiterToken = require('../middlewares/checkRecruiterRole')
router.post('/userSignup' , authControllers.UserSignup) 
router.post("/userSignin",authControllers.UserSignin) 
router.get("/userDetails",authToken,authControllers.userDetails) 
router.get("/userLogout",authControllers.logout)  

router.post("/recruiteSignin",authControllers.signInRecruiter)
router.post("/recruiterSignup",authControllers.signUpEmployer)
router.get("/getRecruiterDetails",recruiterToken,authControllers.getEmployerDetails)

module.exports = router;