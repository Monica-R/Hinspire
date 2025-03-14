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
    </header>
  )
}

export default Header