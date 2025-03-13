import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth.context';
import './StoryItem.css';
import Modal from '../Modal/Modal';
import { deleteStory, updateStory } from '../../services/stories';

function StoryItem({story, getStories}) {
  const { authToken, user } = useAuth();

  const handleUpdate = async (storyId, title, description, token) => {
    try {
      await updateStory(storyId, title, description, token);
      getStories();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (storyId, token) => {
    try {
      await deleteStory(storyId, token);
      getStories();
    } catch (error) {
      console.error(error); 
    }
  };
  return (
    <div className="story-item-container">      
      <Link to={`/stories/${story._id}`} className="story-card" story={story}>
        <h2 className='story-title'>{ story.title }</h2>
        <p className="story-author">{ story.author.username }</p>
      </Link>
        { user?._id === story.author._id 
          && 
          <div className='options-buttons'>
              <Modal story={story} token={authToken} onDelete={handleDelete}>
                <button className="delete-button">🗑️ Eliminar</button>
              </Modal>

              { story.fragments.length === 0 && <Modal story={story} token={authToken} onUpdate={handleUpdate}>
                <button className="update-button">✏️ Editar</button>
              </Modal>}
          </div> 
        }
    </div>
  )
}

export default StoryItem