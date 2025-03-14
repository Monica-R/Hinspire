import React from 'react'
import './NotFound.css';

function NotFound() {
  return (
    <div className='container-error'>
      <h1 className='container-error__h1'>404</h1>
      <strong className='container-error__strong'>Page Not Found</strong>
    </div>
  )
}

export default NotFound