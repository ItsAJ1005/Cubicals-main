import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import AdminHome from './components/superUser/Components/adminHome/adminHome'
import Lists from './components/superUser/Pages/UserLists/UserLists'
import Orders from './components/superUser/Components/Orders/Orders'
import SuperLogin from './components/superUser/Components/Login/SuperLogin'
import ProErr from './components/ProErr'
import NotFoundErr from './components/NotFoundErr'
import LearnMore from './components/LearnMore'
import LearnJob from './components/learn_job' // Add this import
import BlogHome from './components/blogComponents/BlogHome/BlogHome'
import CreatePost from './components/blogComponents/CreatePost'
import MyBlogs from './components/blogComponents/MyBlogs/MyBlogs'
import Pricing from './components/pricing'
import EditJob from './components/admin/EditJob'
import JobSeekerProtectedRoute from './components/admin/JobSeekerProtectedRoute'
import RecruiterProtectedRoute from './components/admin/RecruiterProtectedRoute'
import SuperProtectedRoute from './components/admin/SuperProtectedRoute'
// import EditJob from './components/admin/EditJob'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/learn-more",
    element: <LearnMore />
  },
  {
    path: "/learn", // Add this new route
    element: <LearnJob />
  },

  // **For blog pages**
  {
    path: "/blog",
    element: <BlogHome/>
  },
  {
    path: "/blog/createPost",
    element: <JobSeekerProtectedRoute><CreatePost/></JobSeekerProtectedRoute>
  },
  {
    path: "/blog/myBlogs",
    element: <MyBlogs/>
  },

  // admin ke liye yha se start hoga
  {
    path: "/admin/companies",
    element: <RecruiterProtectedRoute><Companies /></RecruiterProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <RecruiterProtectedRoute><CompanyCreate /></RecruiterProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <RecruiterProtectedRoute><CompanySetup /></RecruiterProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element: <RecruiterProtectedRoute><AdminJobs /></RecruiterProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <RecruiterProtectedRoute><PostJob /></RecruiterProtectedRoute>
  },
  {
    path: "/admin/jobs/edit/:id",
    element: <RecruiterProtectedRoute><EditJob /></RecruiterProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <RecruiterProtectedRoute><Applicants /></RecruiterProtectedRoute>
  },
  // {
  //   path: "/admin/EditJob/:id",
  //   element: <ProtectedRoute><EditJob /></ProtectedRoute>
  // },

  // **For supreme user (highest level)**
  {
    path: "/supreme",
    element: <SuperProtectedRoute><SuperLogin /></SuperProtectedRoute>
  },
  {
    path: "/supreme/adminHome",
    element: <SuperProtectedRoute><AdminHome /></SuperProtectedRoute>
  },

  {
    path: "/supreme/applicants",
    element: <SuperProtectedRoute><Lists type="user" /></SuperProtectedRoute>
  },
  {
    path: "/supreme/recruiters",
    element: <SuperProtectedRoute><Lists type="recruiter" /></SuperProtectedRoute>
  },
  {
    path: "/supreme/Companies",
    element: <SuperProtectedRoute><Lists type="companies" /></SuperProtectedRoute>
  },
  {
    path:"/pricing",
    element:<Pricing />
  },
  {
    path: "/supreme/JobVacancies",
    element: <SuperProtectedRoute><Orders /></SuperProtectedRoute>
  },
  {
    path:"/proErr",
    element:<ProErr/>
  },
  {
    path:"*",
    element:<NotFoundErr/>
  },

])
function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
