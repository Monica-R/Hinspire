import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchStories } from '../../services/stories';
import { useAuth } from '../../context/auth.context';
import './ProfileView.css';

function ProfileView() {
  const [stories, setStories] = useState([]);
  const { user } = useAuth();
  
  const getRecentStories = useCallback(async () => {
    try {
      const stories = await fetchStories();
      setStories(stories);
    } catch (error) {
      console.error("Error loading stories", error);
    }
  }, []);

  useEffect(() => {
    getRecentStories();
  }, [getRecentStories]);

  const getStoriesDesc = [...stories].sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="profile-container">
      <section className="profile-header">
        <div className="image-user">
          <img src={user?.avatar || "/images/stars.jpg"} alt="User avatar" />
        </div>
        <h2>{user?.username}</h2>
        <p>{user?.email}</p>
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
    </div>
  )
}

export default ProfileView