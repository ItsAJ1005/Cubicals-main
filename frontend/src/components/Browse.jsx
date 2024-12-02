import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs(); // Ensure this hook fetches and sets the allJobs data
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery("")); // Reset search query on unmount
        };
    }, [dispatch]);

    console.log(allJobs.map(job => typeof job.company));
console.log(allJobs);


    // Filter jobs based on the searchedQuery
    const filteredJobs = allJobs.filter(job => {
        const title = job.title || ""; // Handle missing title gracefully
        const companyName = job.company?.name || ""; // Safely access job.company.name
        return (
            title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            companyName.toLowerCase().includes(searchedQuery.toLowerCase())
        );
    });
    

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({filteredJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {filteredJobs.map((job) => (
                        <Job key={job._id} job={job} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Browse;
