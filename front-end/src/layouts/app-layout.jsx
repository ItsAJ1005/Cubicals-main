import Header from '@/components/Header';
import React from 'react'
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div>
        <div className='grid-backgorund'></div>
        <main className='min-h-screen container'>
          <Header/>
          <Outlet/>

        </main>

        <div className='p-10 text-center bg-gray-800 my-10'>Made with ♥ by team Cubicles</div>
    </div>
  )
}

export default AppLayout;
