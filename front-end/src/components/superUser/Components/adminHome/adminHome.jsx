import React from 'react';
import Chart from '../Chart/Chart';
import ItemLists from '../ItemLists/ItemLists';
import Navbar from '../Navbar/Navbar';
import ProgressBar from '../ProgressBar/ProgressBar';
import Sidebar from '../Sidebar/Sidebar';
import TableList from '../TableList/TableList';
import './Home.scss';

function AdminHome() {
    return (
        <div className="home">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="home_main">
                <Navbar />

                <div className="bg_color" />

                <div className="home_items">
                    <ItemLists type="Applicants" />
                    <ItemLists type="Recruiter" />
                    <ItemLists type="Job Vacancies" />
                    <ItemLists type="Companies" />
                </div>

                <div className="chart_sec">
                    <ProgressBar />
                    <Chart height={450} title="New Users" />
                </div>

                <div className="table">
                    <div className="title">Latest Transactions</div>
                    <TableList />
                </div>
            </div>
        </div>
    );
}

export default AdminHome;
