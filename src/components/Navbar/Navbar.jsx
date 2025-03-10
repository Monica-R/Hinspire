import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth.context';

function Navbar() {
  const { authToken, setAuthToken, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthToken(null); //Borramos el token
    navigate("/");
  }

  return (
    <nav className='nav'>
      { authToken ? (
        <>
          <Link to="/profile">Hi, { user?.username }!</Link>
          <button onClick={handleLogout}>Logout</button>
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