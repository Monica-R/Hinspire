import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth.context';

function Navbar() {
  const { authToken, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className='nav'>
      { authToken && user ? (
        <>
          <Link to="/profile">Hi, { user?.username }!</Link>
          <button onClick={() => {logout(); navigate("/");}}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">SignUp</Link>
        </>
      ) }
    </nav>
  )
}

export default Navbar