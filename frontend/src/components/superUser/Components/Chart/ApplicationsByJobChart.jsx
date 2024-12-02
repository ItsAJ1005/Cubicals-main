import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// import { JOB_API_END_POINT } from '@/utils/constant';

const ApplicationsByJobChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Commenting out the actual API call
        // const response = await axios.get(`${JOB_API_END_POINT}/applications`);

        // Sample data to simulate the API response
        const response = {
          data: {
            applicationCounts: [
              { jobTitle: 'Software Engineer', count: 20 },
              { jobTitle: 'Data Scientist', count: 15 },
              { jobTitle: 'Product Manager', count: 10 },
            ],
          },
        };

        const applicationCounts = response.data.applicationCounts;
        setData(applicationCounts);
      } catch (error) {
        console.error('Error fetching application data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', height: 300, marginLeft: '-200px' }}>
       <p style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#4B0082',
            textAlign: 'left',
            whiteSpace: 'nowrap'
          }}>
            Applications by job
          </p>
    <BarChart
      width={850}
      height={300}
      data={data}
      margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
    >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="jobTitle" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#FF6384" />
      </BarChart>
    </div>
  );
};

export default ApplicationsByJobChart;
