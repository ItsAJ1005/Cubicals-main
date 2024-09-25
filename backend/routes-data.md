# Job Portal API Documentation

## AuthRoutes

- **`/register`**
  - **URL:** `http://127.0.0.1:3000/auth/register`
  - **Method:** POST
  - **Controller:** user.controller.js.register
  - **Example Payload:**
    ```json
    {
      "name": "Aarav Sharma",
      "email": "aarav.sharma@example.com",
      "password": "123",
      "role": "jobSeeker",
      "address": {
        "street": "456 Elm St",
        "city": "Mumbai",
        "state": "MH",
        "zipCode": "400001",
        "country": "India"
      },
      "profilePicture": "https://www.example.com/profile-pic.jpg",
      "resume": "https://www.example.com/resume.pdf"
    }
    ```

--------------------------------------------------------------------------------

- **`/login`**
  - **URL:** `http://127.0.0.1:3000/auth/login`
  - **Method:** POST
  - **Controller:** user.controller.js.login
  - **Example Payload:**
    ```json
    {
      "email": "aarav.sharma@example.com",
      "password": "123"
    }
    ```

--------------------------------------------------------------------------------

- **`/logout`**
  - **URL:** `http://127.0.0.1:3000/auth/logout`
  - **Method:** GET
  - **Controller:** user.controller.js.logout
  - **Example Request:**
    - Header: `Authorization: Bearer <token>`

--------------------------------------------------------------------------------

## CompanyRoutes

- **`/register`**
  - **URL:** `http://127.0.0.1:3000/company/register`
  - **Method:** POST
  - **Middleware:** isAuthenticated
  - **Controller:** company.controller.js.registerCompany
  - **Example Payload:**
    ```json
    {
      "name": "Tech Innovations Pvt. Ltd.",
      "website": "https://www.techinnovations.com",
      "location": "Bengaluru, India"
    }
    ```

--------------------------------------------------------------------------------

- **`/get`**
  - **URL:** `http://127.0.0.1:3000/company/get`
  - **Method:** GET
  - **Middleware:** isAuthenticated
  - **Controller:** company.controller.js.getCompany

--------------------------------------------------------------------------------

- **`/get/:id`**
  - **URL:** `http://127.0.0.1:3000/company/get/:id`
  - **Method:** GET
  - **Middleware:** isAuthenticated
  - **Controller:** company.controller.js.getCompanyById

--------------------------------------------------------------------------------

- **`/update/:id`**
  - **URL:** `http://127.0.0.1:3000/company/update/:id`
  - **Method:** PUT
  - **Middleware:** isAuthenticated, singleUpload
  - **Controller:** company.controller.js.updateCompany
  - **Example Payload:**
    ```json
    {
      "name": "Updated Company Name",
      "website": "https://www.updatedwebsite.com"
    }
    ```

--------------------------------------------------------------------------------

## JobRoutes

- **`/post`**
  - **URL:** `http://127.0.0.1:3000/job/post`
  - **Method:** POST
  - **Middleware:** isAuthenticated
  - **Controller:** job.controller.js.postJob
  - **Example Payload:**
    ```json
    {
      "title": "Software Engineer",
      "description": "Job description goes here.",
      "requirements": "Requirements for the job.",
      "location": "Bengaluru, India",
      "salary": 60000,
      "openings": 2
    }
    ```

--------------------------------------------------------------------------------

- **`/get`**
  - **URL:** `http://127.0.0.1:3000/job/get`
  - **Method:** GET
  - **Middleware:** isAuthenticated
  - **Controller:** job.controller.js.getAllJobs

--------------------------------------------------------------------------------

- **`/getadminjobs`**
  - **URL:** `http://127.0.0.1:3000/job/getadminjobs`
  - **Method:** GET
  - **Middleware:** isAuthenticated
  - **Controller:** job.controller.js.getAdminJobs

--------------------------------------------------------------------------------

- **`/get/:id`**
  - **URL:** `http://127.0.0.1:3000/job/get/:id`
  - **Method:** GET
  - **Middleware:** isAuthenticated
  - **Controller:** job.controller.js.getJobById

--------------------------------------------------------------------------------

## ApplicationRoutes

- **`/apply/:id`**
  - **URL:** `http://127.0.0.1:3000/application/apply/:id`
  - **Method:** POST
  - **Middleware:** isAuthenticated
  - **Controller:** application.controller.js.applyJob
  - **Example Payload:**
    ```json
    {
      "resume": "https://www.example.com/myresume.pdf"
    }
    ```

--------------------------------------------------------------------------------

- **`/get`**
  - **URL:** `http://127.0.0.1:3000/application/get`
  - **Method:** GET
  - **Middleware:** isAuthenticated
  - **Controller:** application.controller.js.getAppliedJobs

--------------------------------------------------------------------------------

- **`/:id/applicants`**
  - **URL:** `http://127.0.0.1:3000/application/:id/applicants`
  - **Method:** GET
  - **Middleware:** isAuthenticated
  - **Controller:** application.controller.js.getApplicants

--------------------------------------------------------------------------------

- **`/status/:id/update`**
  - **URL:** `http://127.0.0.1:3000/application/status/:id/update`
  - **Method:** PATCH
  - **Middleware:** isAuthenticated
  - **Controller:** application.controller.js.updateStatus
  - **Example Payload:**
    ```json
    {
      "status": "accepted" // or "rejected", "pending"
    }
    ```

--------------------------------------------------------------------------------

