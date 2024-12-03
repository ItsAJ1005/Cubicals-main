/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import './tableList.scss';

// mui table
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// mui circular progress for loading state
import CircularProgress from '@mui/material/CircularProgress';
import { COMPANY_API_END_POINT } from '@/utils/constant';

// Make the API call to the backend
function TableList() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch(`${COMPANY_API_END_POINT}/companies/all`); // Assuming this is the correct route
                const data = await response.json();
                if (data.success) {
                    setCompanies(data.companies);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching companies:', error);
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    return (
        <TableContainer component={Paper} className="table_list">
            {loading ? (
                <CircularProgress />
            ) : (
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table_cell">Company Id</TableCell>
                            <TableCell className="table_cell">Company</TableCell>
                            <TableCell className="table_cell">Location</TableCell>
                            <TableCell className="table_cell">Created By</TableCell>
                            <TableCell className="table_cell">Website</TableCell>
                            <TableCell className="table_cell">Created On</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map((company) => (
                            <TableRow key={company._id}>
                                <TableCell component="th" scope="row" className="table_cell">
                                <img src={company.logo || 'https://img.icons8.com/?size=100&id=7819&format=png&color=C850F2'} alt={company.name} className="company_logo_img h-10" />
                                    <div>{company._id}</div>
                                </TableCell>
                                <TableCell className="table_cell">{company.name}</TableCell>
                                <TableCell className="table_cell">{company.location || 'N/A'}</TableCell>
                                <TableCell className="table_cell">{company.userId?.fullname || 'Unknown'}</TableCell>
                                <TableCell className="table_cell">{company.website || 'N/A'}</TableCell>
                                <TableCell className="table_cell">{new Date(company.createdAt).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    );
}

export default TableList;
