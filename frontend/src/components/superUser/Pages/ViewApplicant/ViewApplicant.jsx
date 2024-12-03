import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ViewApplicant.scss';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

function ViewApplicant() {
    const { userId } = useParams();
    const [applicant, setApplicant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplicant = async () => {
            try {
                const response = await fetch(`${APPLICATION_API_END_POINT}/applicants/${userId}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) throw new Error('Failed to fetch applicant details');
                const result = await response.json();
                setApplicant(result.applicant);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApplicant();
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        // <div className="view-applicant">
        //     <h2>{applicant.fullname}</h2>
        //     <p>Email: {applicant.email}</p>
        //     <p>Phone: {applicant.phoneNumber}</p>
        //     <p>Status: {applicant.status}</p>
        // </div>
        hi
    );
}

export default ViewApplicant;
