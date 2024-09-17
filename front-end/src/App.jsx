
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './layouts/app-layout';

const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children: [
      {
        path: '/',
        element: <LandingPage/>
      }
    ]
  }
])





function App() {

  return (
   <RouterProvider router={router} />
  );
}

export default App
