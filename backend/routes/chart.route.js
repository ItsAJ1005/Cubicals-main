import express from 'express';
import { 
  getJobsByCompany, 
  getApplicationsByJob, 
  getApplicationsByStatus, 
  getApplicationsOverTime 
} from '../controllers/chart.controller.js';

const router = express.Router();

// Simple route that doesn't require authentication for testing
router.get('/jobsByCompany', getJobsByCompany);
router.get('/applicationsByJob', getApplicationsByJob);
router.get('/statusCounts', getApplicationsByStatus);
router.get('/applicationsOverTime', getApplicationsOverTime);

export default router;
