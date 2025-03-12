import React from 'react'
import './EditProfileView.css';
import { Link } from 'react-router-dom';

function EditProfileView() {

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Profile updated');
  };

  return (
    <div className='edit-profile'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username</label>
        <input type='text' id='username' name='username' />
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name='email' />
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' />
        <button type='submit'>Update profile</button>
      </form>
      <div className="back-to"><Link to="/profile">Back to profile</Link></div>
      <div className="danger-zone">
        <h2>Danger zone</h2>
        <button className='delete-acc'>Delete account</button>
      </div>
    </div>
  )
}

export default EditProfileView