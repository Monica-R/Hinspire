import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='nav'>
      <Link to="/login">Conectarse</Link>
      <Link to="/signup">Registro</Link>
    </nav>
  )
}

export default Navbar