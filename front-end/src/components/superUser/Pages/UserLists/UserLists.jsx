import React from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../Components/DataTable/DataTable';
import DataTableRecruiter from '../../Components/DataTableRecruiter/DataTableRecruiter'; // Import the new component
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';
import TableList from '../../Components/TableList/TableList';
import './userlists.scss';

function Lists({ type }) {
    const getLinkPath = () => {
        switch (type) {
            case 'companies':
                return '/companies/addnew';
            case 'user':
                return '/addnew';
            case 'recruiter':
                return '/recruiters/addnew';
            default:
                return;
        }
    };

    const renderTable = () => {
        switch (type) {
            case 'user':
                return <DataTable />;
            case 'recruiter':
                return <DataTableRecruiter />;
            default:
                return <TableList />;
        }
    };

    return (
        <div className="list_page">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="list_page_main">
                <Navbar />

                <div className="data_table">
                    <div className="btnn">
                        <Link to={getLinkPath()} style={{ textDecoration: 'none' }}>
                            <button type="button">Add New {type}</button>
                        </Link>
                    </div>

                    {renderTable()}
                </div>
            </div>
        </div>
    );
}

export default Lists;
