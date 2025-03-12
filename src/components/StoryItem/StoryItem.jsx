import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth.context';
import './StoryItem.css';
import EditStoryModal from '../EditModal/EditModal';

function StoryItem({story}) {
  const { authToken, user } = useAuth();

  const handleUpdate = async () => {
    try {
      //holaaa
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async () => {
    try {
      // holaaa
    } catch (error) {
     console.error(error); 
    }
  };

  return (
    <Link to={`/stories/${story._id}`} className="story-card" story={story}>
      <h2 className='story-title'>{ story.title }</h2>
      <p className="story-author">{ story.author.username }</p>
      { user?._id === story.author._id 
        && 
        <div className='options-buttons'>
          <button className="delete-button" onClick={handleDelete}>Delete story</button>
          <button className="update-button" onClick={handleUpdate}>Update story</button>
          <EditStoryModal story={story} token={authToken} /* onUpdate={onUpdateStory} */ />
        </div> 
      }
    </Link>
  )
}

export default StoryItem