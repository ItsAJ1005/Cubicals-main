import React from 'react';
import { useParams } from 'react-router-dom';

const JobDetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Job Detail</h1>
      <p>Details for job ID: {id}</p>
    </div>
  );
};

export default JobDetailPage;
