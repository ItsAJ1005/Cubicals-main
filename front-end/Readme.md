
# Job Portal - Frontend

## Overview

This is the frontend component of the Job Portal application. The Job Portal allows users to search for jobs, apply to openings, and manage their applications. The frontend is built using JSX and modern web technologies to provide a seamless and responsive user experience.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- **React (JSX)** - A JavaScript library for building user interfaces using JSX syntax.
- **Redux** - State management for React applications.
- **Axios** - HTTP client for making API requests.
- **React Router** - For navigation and routing in the app.
- **Tailwind CSS** - Utility-first CSS framework for styling.
- **Webpack** - Module bundler for JavaScript applications.
- **Jest & React Testing Library** - For unit and integration testing.

## Features

- **Job Listings**: Browse and search for job listings with filters for location, job type, and company.
- **Job Details**: View detailed information about job openings.
- **User Authentication**: Sign up, login, and manage user profiles.
- **Apply for Jobs**: Users can apply to jobs and upload resumes.
- **Dashboard**: Users can manage their applications and view job recommendations.
- **Responsive Design**: Mobile-first design approach to ensure usability on various devices.

## Project Structure

```plaintext
front-end/
├── public/                  # Public files (HTML, images, etc.)
├── src/
│   ├── assets/              # Static assets (images, fonts, etc.)
│   ├── components/          # Reusable React components
│   ├── pages/               # Page components
│   ├── redux/               # Redux actions, reducers, and store configuration
│   ├── services/            # API service integrations
│   ├── utils/               # Utility functions
│   ├── App.js               # Main app component
│   └── index.js             # Entry point of the application
├── .env                     # Environment variables
├── package.json             # NPM dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
└── webpack.config.js        # Webpack configuration
```

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Cubicles2024/Cubicals-main/tree/main
   cd job-portal-frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Running the Application

To start the development server, run:

```bash
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Environment Variables

To configure the environment variables, create a `.env` file in the root directory. The following variables are typically required:

```plaintext
REACT_APP_API_URL=http://api.yourdomain.com
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
REACT_APP_FACEBOOK_APP_ID=your-facebook-app-id
```

## API Integration

The frontend interacts with a RESTful API for user authentication, job listings, and application management. Ensure the API base URL is set correctly in the `.env` file.

## Contributing

1. **Fork the repository**
2. **Create a new branch** (`git checkout -b feature/your-feature-name`)
3. **Commit your changes** (`git commit -m 'Add some feature'`)
4. **Push to the branch** (`git push origin feature/your-feature-name`)
5. **Create a new Pull Request**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---