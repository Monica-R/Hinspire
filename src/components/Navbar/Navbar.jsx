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
          <Link className='link' to="/profile">Hi, { user?.username }!</Link>
          <button onClick={() => {logout(); navigate("/");}}>Logout</button>
        </>
      ) : (
        <>
          <Link className=' link login' to="/login">Login</Link>
          <Link className=' link signup' to="/signup">SignUp</Link>
        </>
      ) }
    </nav>
  )
}

export default Navbar