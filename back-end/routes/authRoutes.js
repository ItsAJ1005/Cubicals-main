const express = require('express')
const router =  express.Router() ;
const authControllers = require('../controllers/authControllers')
const authToken = require('../middlewares/authToken');

router.post('/signup' , authControllers.signup) 
router.post("/signin",authControllers.signin) 
router.get("/user-details",authToken,authControllers.userDetails) 
router.get("/userLogout",authControllers.logout)  

module.exports = router;