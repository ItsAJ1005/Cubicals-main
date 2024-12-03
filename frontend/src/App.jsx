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
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminHome from './components/superUser/Components/adminHome/adminHome'
import Lists from './components/superUser/Pages/UserLists/UserLists'
import Orders from './components/superUser/Components/Orders/Orders'
import SuperLogin from './components/superUser/Components/Login/SuperLogin'
import ProErr from './components/ProErr'
import NotFoundErr from './components/NotFoundErr'
import LearnMore from './components/LearnMore'
import BlogHome from './components/blogComponents/BlogHome/BlogHome'
import CreatePost from './components/blogComponents/CreatePost'
import MyBlogs from './components/blogComponents/MyBlogs/MyBlogs'
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

  // **For blog pages**
  {
    path: "/blog",
    element: <BlogHome/>
  },
  {
    path: "/blog/createPost",
    element: <ProtectedRoute><CreatePost/></ProtectedRoute>
  },
  {
    path: "/blog/myBlogs",
    element: <MyBlogs/>
  },

  // admin ke liye yha se start hoga
  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  },
  // {
  //   path: "/admin/EditJob/:id",
  //   element: <ProtectedRoute><EditJob /></ProtectedRoute>
  // },

  // **For supreme user (highest level)**
  {
    path: "/supreme",
    element: <SuperLogin />
  },
  {
    path: "/supreme/adminHome",
    element: <ProtectedRoute><AdminHome /></ProtectedRoute>
  },

  {
    path: "/supreme/applicants",
    element: <ProtectedRoute><Lists type="user" /></ProtectedRoute>
  },
  {
    path: "/supreme/recruiters",
    element: <ProtectedRoute><Lists type="recruiter" /></ProtectedRoute>
  },
  {
    path: "/supreme/Companies",
    element: <ProtectedRoute><Lists type="companies" /></ProtectedRoute>
  },
  {
    path: "/supreme/JobVacancies",
    element: <ProtectedRoute><Orders /></ProtectedRoute>
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
