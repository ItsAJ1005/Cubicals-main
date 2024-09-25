import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import BarChartIcon from '@mui/icons-material/BarChart';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import TableChartIcon from '@mui/icons-material/TableChart';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="logo">
                <Link to="/supreme" style={{ textDecoration: 'none' }}>
                    <h3 className="text_none">Admin Dashboard</h3>
                </Link>
            </div>

            <div className="links">
                <ul>
                    <p className="spann">Main</p>
                    <Link to="/supreme" style={{ textDecoration: 'none' }}>
                        <li>
                            <DashboardIcon className="icon" /> Dashboard
                        </li>
                    </Link>

                    <p className="spann">lists</p>
                    <Link to="/supreme/applicants" style={{ textDecoration: 'none' }}>
                        <li>
                            <PersonIcon className="icon" /> Applicant
                        </li>
                    </Link>
                    <Link to="/supreme/recruiters" style={{ textDecoration: 'none' }}>
                        <li>
                            <PersonIcon className="icon" /> Recruiter
                        </li>
                    </Link>

                    <Link to="/supreme/Companies" style={{ textDecoration: 'none' }}>
                        <li>
                            <TableChartIcon className="icon" /> Companies
                        </li>
                    </Link>
                    <Link to="/supreme/JobVacancies" style={{ textDecoration: 'none' }}>
                        <li>
                            <CreditCardIcon className="icon" /> Job Vacancies
                        </li>
                    </Link>

                    <p className="spann">Seetings</p>

                    <li>
                        <LogoutIcon className="icon" /> Log Out
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
