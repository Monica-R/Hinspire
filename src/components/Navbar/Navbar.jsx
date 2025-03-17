import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth.context';
import './Navbar.css'

function Navbar() {
  const { authToken, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className='nav'>
      { authToken && user ? (
        <>
          <Link className=' link' to="/">Home</Link>
          <Link className='link' to="/stories">Stories</Link>
          <Link className=' link' to="#">About</Link>
          <Link className='link' to="/profile">Hi, { user?.username }!</Link>
          <button className='logout' onClick={() => {logout(); navigate("/");}}>Logout</button>
        </>
      ) : (
        <>
          <Link className=' link' to="/">Home</Link>
          {/* <Link className='link' to="/stories">Stories</Link> */}
          <Link className=' link' to="#">About</Link>
          <Link className=' link login' to="/login">Login</Link>
          <Link className=' link signup' to="/signup">SignUp</Link>
        </>
      ) }
    </nav>
  )
}

export default Navbar