import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <nav className='py-4 flex justify-between items-center'>
        <Link>
            <img src='/Cubicles_logo.png' className='h-20'/>
        </Link>

        <Button variant="outline">Login</Button>
      </nav>

    </>
  )
}

export default Header;
