const express = require('express');
const router = express.Router();
const CollaborationController = require('../controllers/collaborationController');
const verifyToken = require('../middlewares/authToken');
const isRecruiter = require('../middlewares/checkRecruiterRole');

router.post('/enroll', verifyToken, isRecruiter, CollaborationController.enrollInCollaboration);
router.get('/pool', verifyToken, isRecruiter, CollaborationController.getCollaborationPool);
router.post('/:collaborationId/request', verifyToken, isRecruiter, CollaborationController.sendCollaborationRequest);
router.put('/:collaborationId/request/:requestId', verifyToken, isRecruiter, CollaborationController.updateCollaborationRequest);
router.post('/:collaborationId/createJob', verifyToken, isRecruiter, CollaborationController.createJobFromCollaboration);


module.exports = router;
