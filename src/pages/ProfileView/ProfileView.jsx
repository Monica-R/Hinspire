import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchStories } from '../../services/stories';
import { fetchProfile } from '../../services/profile';
import './ProfileView.css';

function ProfileView() {

  const [user, setUser] = useState(null);
  const [stories, setStories] = useState([]);
  
  useEffect(() => {
    getProfileUser();
    getRecentStories();
  }, []);

  const getProfileUser = async () => {
    try {
      const profile = await fetchProfile();
      setUser(profile.user);
    } catch (error) {
      console.error("Error loading profile", error);
    }
  };

  const getRecentStories = async () => {
    try {
      const stories = await fetchStories();
      setStories(stories);
    } catch (error) {
      console.error("Error loading stories", error);
    }
  };

  const getStoriesDesc = stories.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <section className="profile-header">
        <img src={user.avatar || "/default-avatar.png"} alt="User avatar" />
        <h2>{user.username}</h2>
        <p>{user.email}</p>
      </section>

      <section className="profile-zone">
        <div className="navbar-options">          
          <Link to="/stories">Explore</Link>
          <Link to="/stories/user">My Stories</Link>
          <Link to="/edit-profile">Edit profile</Link>
        </div>
        <article className="recent-stories">
          <h2 className="recent-stories__h2">Recent stories</h2>
        {getStoriesDesc.length === 0 ? (
          <p className='recent-stories__p'>No stories yet.</p>
        ) : (
          <ul>
            {getStoriesDesc.slice(0, 5).map(story => (
              <li key={story._id}>
                <a href={`/stories/${story._id}`}>{story.title}</a>
              </li>
            ))}
          </ul>
        )}
        </article>
      </section>
    </div>
  )
}

export default ProfileView