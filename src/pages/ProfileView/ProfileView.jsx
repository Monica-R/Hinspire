import React, { useCallback } from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { fetchStories } from '../../services/stories';
import { fetchProfile } from '../../services/profile';
import { useAuth } from '../../context/auth.context';
import './ProfileView.css';

function ProfileView() {

  const [user, setUser] = useState(null);
  const [stories, setStories] = useState([]);
  const { authToken, isLoading, startLoading, stopLoading } = useAuth();

  const getProfileUser = useCallback(async () => {
    try {
      startLoading();
      const profile = await fetchProfile(authToken);
      setUser(profile.user);
    } catch (error) {
      console.error("Error loading profile", error);
    } finally {
      stopLoading();
    }
  }, [authToken, startLoading, stopLoading]);
  
  const getRecentStories = useCallback(async () => {
    try {
      startLoading();
      const stories = await fetchStories();
      setStories(stories);
    } catch (error) {
      console.error("Error loading stories", error);
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  useEffect(() => {
    getProfileUser();
  }, [getProfileUser]);  // Solo se ejecuta si `getProfileUser` cambia
  
  useEffect(() => {
    getRecentStories();
  }, [getRecentStories]);  // Solo se ejecuta si `getRecentStories` cambia

  const getStoriesDesc = stories.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      { isLoading ? (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
          <ClipLoader color="#da667b" size={100}/>
        </div>        
      ) : (
        <>
          <section className="profile-header">
            <div className="image-user">
              <img src={user.avatar || "/images/stars.jpg"} alt="User avatar" />
            </div>
            <h2>{user.username}</h2>
            <p>{user.email}</p>
            <Link className='profile-link' to="/edit-profile">Edit profile</Link>
          </section>

          <section className="profile-zone">
            <div className="navbar-options">          
              <Link className='link' to="/stories">Explore</Link>
              <Link className='link' to="/stories/user">My Stories</Link>
            </div>
            <article className="recent-stories">
              <h2 className="recent-stories__h2">Recent stories</h2>
            {getStoriesDesc.length === 0 ? (
              <p className='recent-stories__p'>No stories yet.</p>
            ) : (
              <ul>
                {getStoriesDesc.slice(0, 5).map(story => (
                  <li className='recent-item' key={story._id}>
                    <a href={`/stories/${story._id}`}>{story.title}</a>
                  </li>
                ))}
              </ul>
            )}
            </article>
          </section>
        </>
      )}
    </div>
  )
}

export default ProfileView