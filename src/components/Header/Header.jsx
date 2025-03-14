import React from 'react'
import Navbar from '../Navbar/Navbar'
import './Header.css'

function Header() {
  return (
    <header className='header'>
      <div className="header__div">
        <div className="logo">Hinspire</div>
        <Navbar />
      </div>
      <div className="header__banner">
        <h1 className="header__h1">Create. Collaborate. Get inspired.</h1>
      </div>
    </header>
  )
}

export default Header