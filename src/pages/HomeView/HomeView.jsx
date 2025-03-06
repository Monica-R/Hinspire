import React from 'react'
import { Link } from 'react-router-dom'

function HomeView() {
  return (
    <div>
      HomeView
      <Link to="/login">Conectarse</Link>
      <Link to="/signup">Registro</Link>
    </div>
  )
}

export default HomeView