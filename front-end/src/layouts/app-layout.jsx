import React from 'react'
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div>
        <div className='grid-backgorund'></div>
      <Outlet/>
    </div>
  )
}

export default AppLayout;
