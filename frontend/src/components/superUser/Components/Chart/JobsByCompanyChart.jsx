import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { COMPANY_API_END_POINT } from '@/utils/constant';

const JobsByCompanyChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Commenting out the actual API call
        // const response = await axios.get(`${COMPANY_API_END_POINT}/jobs`);

        // Sample data to simulate the API response
        const response = {
          data: {
            jobCounts: [
              { companyName: 'Company A', count: 10 },
              { companyName: 'Company B', count: 8 },
              { companyName: 'Company C', count: 12 },
            ],
          },
        };

        const jobCounts = response.data.jobCounts;
        setData(jobCounts);
      } catch (error) {
        console.error('Error fetching job data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', height: 300, marginLeft: '-600px',marginTop:'100px'}}>
      <p style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#4B0082',
            textAlign: 'left',
            whiteSpace: 'nowrap'
          }}>
            Company wise Jobs
          </p>
      <BarChart
        width={850}
        height={300}
        data={data}
        margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="companyName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#36A2EB" />
      </BarChart>
    </div>
  );
};

export default JobsByCompanyChart;
