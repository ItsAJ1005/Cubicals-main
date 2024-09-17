
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './layouts/app-layout';
import LandingPage from './pages/landingPage';
import JobListing from './pages/job-listing';
import JobPage from './pages/job';
import PostJobs from './pages/PostJobs';
import SavedJobs from './pages/SavedJobs';
import MyJobs from './pages/MyJobs';

const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children: [
      {
        path: '/',
        element: <LandingPage/>
      },
      {
        path: '/onboarding',
        element: <LandingPage/>
      },
      {
        path: '/jobs',
        element: <JobListing/>
      },
      {
        path: '/job/:id',
        element: <JobPage/>
      },
      {
        path: '/post-job',
        element: <PostJobs/>
      },
      {
        path: '/saved-job',
        element: <SavedJobs/>
      },
      {
        path: '/my-jobs',
        element: <MyJobs/>
      },
    ]
  }
])

function App() {

  return (
   <RouterProvider router={router} />
  );
}

export default App
