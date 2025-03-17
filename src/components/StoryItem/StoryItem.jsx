import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth.context';
import './StoryItem.css';
import Modal from '../Modal/Modal';
import { deleteStory, updateStory, completeStory } from '../../services/stories';

function StoryItem({story, getStories}) {
  const { authToken, user } = useAuth();
  const navigate = useNavigate();

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

  const finishStory = async (storyId, token) => {
    try {
      await completeStory(storyId, token);
      getStories();
    } catch (error) {
      console.error(error);
    }
  }

  const navigateToPath = (event) => {
    if (!authToken) {
      event.preventDefault();
      navigate("login");
    }
  }

  return (
    <div className="story-item-container">
      <div className="layer"></div>
      <Link to={`/stories/${story._id}`} onClick={navigateToPath} className="story-card" story={story}>
        <h2 className='story-title'>{ story.title }</h2>
        <p className="story-author"><ion-icon name="person"></ion-icon> { story.author.username }</p>
      </Link>
        { user?._id === story.author._id 
          && 
          <div className='options-buttons'>
              <Modal story={story} token={authToken} onDelete={handleDelete}>
                <button className="delete-button"><ion-icon name="trash"></ion-icon></button>
              </Modal>

              { story.fragments.length === 0 && <Modal story={story} token={authToken} onUpdate={handleUpdate}>
                <button className="update-button"><ion-icon name="pencil"></ion-icon></button>
              </Modal>}
              { story.status !== "completed" &&
              <Modal story={story} token={authToken} onConfirm={finishStory}>
                <button className='finish-button'><ion-icon name="checkmark-circle"></ion-icon></button>
              </Modal>}
          </div> 
        }
    </div>
  )
}

export default StoryItem