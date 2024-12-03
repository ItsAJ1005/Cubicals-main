import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// import { APPLICATION_API_END_POINT } from '@/utils/constant';

const ApplicationByStatusChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Commenting out the actual API call
        // const response = await axios.get(`${APPLICATION_API_END_POINT}/status`);

        // Sample data to simulate the API response
        const response = {
          data: {
            statusCounts: [
              { status: 'Applied', count: 50 },
              { status: 'Interviewed', count: 30 },
              { status: 'Rejected', count: 20 },
              { status: 'Hired', count: 10 },
            ],
          },
        };

        const statusCounts = response.data.statusCounts;
        setData(statusCounts);
      } catch (error) {
        console.error('Error fetching application status data:', error);
      }
    };

    fetchData();
  }, []);

  const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

  return (
    <div style={{width: '100%', height: 300, marginLeft: '200px'}}>
       <p style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#4B0082',
            textAlign: 'center',
            whiteSpace: 'nowrap'
          }}>
            Application Status
          </p>
      <PieChart width={850} height={300}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="status"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ApplicationByStatusChart;
