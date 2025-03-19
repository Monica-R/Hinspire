import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth.context';
import './Navbar.css'

function Navbar() {
  const { authToken, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú móvil

  return (
    <nav className='nav'>

      {/* Botón de menú hamburguesa */}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
      {authToken && user ? (
          <>
            <Link className="link" to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link className="link" to="/stories" onClick={() => setMenuOpen(false)}>Stories</Link>
            <Link className="link" to="#" onClick={() => setMenuOpen(false)}>About</Link>
            <Link className="link" to="/profile" onClick={() => setMenuOpen(false)}>Hi, {user?.username}!</Link>
            <button className="logout" onClick={() => { logout(); navigate("/"); setMenuOpen(false); }}>Logout</button>
          </>
        ) : (
          <>
            <Link className="link" to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link className="link" to="/stories" onClick={() => setMenuOpen(false)}>Stories</Link>
            <Link className="link" to="#" onClick={() => setMenuOpen(false)}>About</Link>
            <Link className="link login" to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            <Link className="link signup" to="/signup" onClick={() => setMenuOpen(false)}>SignUp</Link>
          </>
        )}
      </div>
{/*       { authToken && user ? (
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
          <Link className='link' to="/stories">Stories</Link>
          <Link className=' link' to="#">About</Link>
          <Link className=' link login' to="/login">Login</Link>
          <Link className=' link signup' to="/signup">SignUp</Link>
        </>
      ) } */}
    </nav>
  )
}

export default Navbar