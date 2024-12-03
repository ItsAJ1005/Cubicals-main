import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import companyController from "../controllers/company.controller.js"; 
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

// Route to register a company (POST method)
router.route("/register").post(isAuthenticated, companyController.registerCompany);

// Route to get all companies for the authenticated user (GET method)
router.route("/get").get(isAuthenticated, companyController.getCompany);

// Route to get a specific company by ID (GET method)
router.route("/get/:id").get(isAuthenticated, companyController.getCompanyById);

// Route to update a company by ID (PUT method with file upload)
router.route("/update/:id").put(isAuthenticated, singleUpload, companyController.updateCompany);

// Add this route to get all companies
router.get('/companies/all', companyController.getAllCompanies); 

//Rouet to get all the recruiters
router.get('/companyCount', companyController.companyCount);

export default router;
