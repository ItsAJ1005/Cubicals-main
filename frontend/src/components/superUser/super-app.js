import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ColorContext } from './ColorContext/darkContext';
import Home from './components/adminHome/adminHome';
import Orders from './Components/Orders/Orders';
import AddNew from './Pages/AddNew/AddNew';
import Detail from './Pages/Detail/Detail';
import Login from './Pages/Login/Login';
import Lists from './Pages/UserLists/UserLists';
import ViewApplicant from './Pages/ViewApplicants/ViewApplicants'; // Import ViewApplicant component
import './app.scss';

const userInpDetails = [
    { id: 1, name: 'username', label: 'Username', type: 'text', placeholder: 'John23', required: true, pattern: '^[A-Za-z0-9]{3,12}$', errorMsg: 'Username should be 3-12 characters & should not include any special character!' },
    { id: 2, name: 'name', label: 'Name', type: 'text', placeholder: 'John Smith', required: true, pattern: '^[A-Za-z]{1,20}$', errorMsg: 'Name is required!' },
    { id: 3, name: 'email', label: 'Email', type: 'email', placeholder: 'example@email.com', required: true, errorMsg: 'Enter a valid email!' },
    { id: 4, name: 'password', label: 'Password', type: 'password', placeholder: 'Password', required: true, pattern: '^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{6,20}$', errorMsg: 'Password should be 6-20 characters and include at least 1 num, 1 letter, 1 special character!' },
    { id: 5, name: 'address', label: 'Address', type: 'text', placeholder: 'Address', required: true, errorMsg: 'Address is required!' },
];

function Supreme_App() {
    const { darkMode } = useContext(ColorContext);

    return (
        <div className={darkMode ? 'App dark' : 'App'}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/applicants">
                        <Route index element={<Lists type="user" />} />
                        <Route path="/addnew" element={<AddNew inputs={userInpDetails} titlee="Add New Applicant" type="USER" />} />
                        <Route path="/view/:userId" element={<ViewApplicant />} />
                    </Route>
                    <Route path="JobVacancies" element={<Orders />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
    
export default Supreme_App;
