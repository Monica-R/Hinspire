import React from 'react'
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <div className="navbar">
        <div className="section-left">
            <h4 className="brand-name">Hinspire</h4>
            <div className="navbar-buttons">
                <a href="https://github.com/Monica-R/Hinspire">
                    <ion-icon className="my-icon" name="logo-github"></ion-icon>
                </a>
                <a href="https://www.linkedin.com/in/monica-roka">
                    <ion-icon className="my-icon" name="logo-linkedin"></ion-icon>
                </a>
            </div>
        </div>
        <div className="section-right">
            <ul className='other-options'>
                <li>Terms of service</li>
                <li>Privacy Policy</li>
                <li>FAQ</li>
            </ul>
        </div>
      </div>
      <div className="info-app">
        <strong className='footer__span'>&copy; 2025 Hinspire Inc. All rights reserved. </strong>
        <strong>Developed with ❤ by <a href="https://github.com/Monica-R">Mónica-R</a></strong>
      </div>
    </footer>
  )
}

export default Footer
