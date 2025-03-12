import React from 'react'
import { Link } from 'react-router-dom';
import './StoryItem.css';

function StoryItem({story}) {
  return (
    <Link to={`/stories/${story._id}`} className="story-card" story={story}>
      <h2 className='story-title'>{ story.title }</h2>
      <p className="story-author">{ story.author.username }</p>
    </Link>
  )
}

export default StoryItem