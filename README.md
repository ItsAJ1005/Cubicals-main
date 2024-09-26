# Cubicles

## 1. Introduction

Cubicles is a job portal application that enables companies to post job openings and recruit talent. It offers features such as job seeker applications, recruiter management, and job collaborations between companies. The backend is powered by Node.js, Express, and MongoDB, with JWT-based authentication and authorization.

## 2. Getting Started

### Prerequisites

- **Node.js** (v14+)
- **MongoDB** (locally or a cloud instance like MongoDB Atlas)
- **Postman** (optional, for testing API endpoints)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Cubicles2024/Cubicles-main.git
    ```

2. Navigate to the project directories (backend and frontend):

    ```bash
    cd ./backend
    cd ./frontend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up your environment variables by creating a `.env` file in the `backend` folder with the following content:

    ```bash
    MONGO_URI='<YOUR_MONGO_URI>'
    CLOUD_NAME='<YOUR_CLOUD_NAME>'
    API_KEY='<YOUR_CLOUDINARY_API_KEY>'
    API_SECRET='<YOUR_CLOUDINARY_API_SECRET>'
    CLOUDINARY_URL='<YOUR_CLOUDINARY_URL>'
    SECRET_KEY='<YOUR_SECRET_KEY>'
    ```

### Running the Server

- To run the backend server in development mode:

    ```bash
    npm run dev
    ```

- To run the frontend server:

    ```bash
    npm run dev
    ```

## 3. Project Structure

The project is organized into the following folders and files:

```bash
Cubicles/
├── controllers/
│   ├── application.controller.js
│   ├── company.controller.js
│   ├── job.controller.js
│   └── user.controller.js
├── middleware/
│   ├── isAuthenticated.js
│   ├── mailer.js
│   └── multer.js
├── models/
│   ├── application.model.js
│   ├── company.model.js
│   ├── job.model.js
│   └── user.model.js
├── routes/
│   ├── application.route.js
│   ├── company.route.js
│   ├── job.route.js
│   └── user.route.js
├── utils/
│   ├── cloudinary.js
│   ├── datauri.js
│   └── db.js
├── app.js
├── package.json
├── README.md
└── .env.example
```

## 4. Features

- **Recruiter Management:** Recruiters can add, edit, and delete job postings.
- **Job Applications:** Job seekers can apply for jobs, and recruiters can accept or reject applications.
- **Collaboration:** Companies can collaborate to post hybrid jobs.
- **Admin Dashboard:** Admins can manage recruiters, job seekers, and job listings.

## 5. API Endpoints Documentation

### User Routes

- `POST /user/register`: Register a new user (requires file upload for profile picture).
- `POST /user/login`: Log in a user.
- `GET /user/logout`: Log out a user.
- `POST /user/profile/update`: Update user profile (requires authentication).

### Company Routes

- `POST /company/register`: Register a new company (requires authentication).
- `GET /company/get`: Get all registered companies.
- `GET /company/get/:id`: Get a company by its ID.
- `PUT /company/update/:id`: Update company details (requires authentication).

### Job Routes

- `POST /job/post`: Post a new job (requires authentication).
- `GET /job/get`: Get all job listings.
- `GET /job/get/:id`: Get job details by ID.
- `GET /job/getadminjobs`: Get all jobs posted by the admin.

### Application Routes

- `POST /application/apply/:id`: Apply for a job (requires authentication).
- `GET /application/get`: Get all jobs applied by the user.
- `GET /application/:id/applicants`: Get all applicants for a specific job.
- `PATCH /application/status/:id/update`: Update the status of an application.
- `DELETE /application/withdraw/:id`: Withdraw a job application.

## 6. Database Schema

### User Model

```javascript
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: String, enum: ['jobSeeker', 'recruiter'], default: 'jobSeeker' },
  profilePicture: String,
  resume: String
});
```

### Company Model

```javascript
const CompanySchema = new mongoose.Schema({
  name: String,
  website: String,
  location: String
});
```

### Job Model

```javascript
const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  requirements: String,
  location: String,
  salary: Number,
  openings: { type: Number, default: 1 },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});
```

### Application Model

```javascript
const ApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resume: String,
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
});
```

## 7. Collaboration Workflow

1. **Enroll in Pool:** Recruiters enroll their company in a collaboration pool.
2. **Send Requests:** Recruiters send collaboration requests to companies.
3. **Accept Requests:** Once accepted, the company is removed from the pool, and a collaboration job is created.

## 8. Admin Functionalities

- **View Data:** Admins can view the total number of applicants, job seekers, and recruiters.
- **Manage Users:** Admins can add or delete recruiters and job seekers.
- **Job Listings:** Admins can manage job openings across companies.

## 9. Technologies Used

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Frontend:** React, Vite
- **Version Control:** Git
