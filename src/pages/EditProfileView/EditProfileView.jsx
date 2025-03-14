import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth.context';
import { editProfile, deleteProfile } from '../../services/profile';
import './EditProfileView.css';

function EditProfileView() {
  const navigate = useNavigate();
  const { authToken, user, logout, isLoading, startLoading, stopLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.username || "",
    email: user?.email || "",
    password: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name] : value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      startLoading();
      await editProfile(formData, authToken);
      navigate("/profile");
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
  };

  const deleteAccount = async () => {
    try {
      startLoading();
      await deleteProfile(authToken);
      logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
  }

  return (
    <div className='edit-profile'>
      { isLoading ? (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
          <ClipLoader color="#36d7b7" size={100}/>
        </div>
      ) : (
        <>
          <h2>Edit profile</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Username</label>
            <input type='text' id='name' name='name' value={formData.name} onChange={handleChange}/>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' value={formData.email} onChange={handleChange}/>
            <label htmlFor='password'>Password</label>
            <input type='password' id='currentPassword' name='password' value={formData.password} onChange={handleChange}/>
            <button type='submit'>Update profile</button>
          </form>
          <div className="back-to"><Link to="/profile">Back to profile</Link></div>
          <div className="danger-zone">
            <h3>Danger zone</h3>
            <button className='delete-acc' onClick={() => setShowDeleteModal(true)}>Delete account</button>
          </div>

          {/* Modal de confirmación para eliminar la cuenta */}
          {showDeleteModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Confirm Account Deletion</h3>
                <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                <div className="modal-buttons">
                  <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
                  <button className="delete-confirm" onClick={deleteAccount}>Confirm Delete</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default EditProfileView