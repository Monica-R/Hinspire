import { Link } from 'react-router-dom';
import './StoryItem.css';
import React from 'react'

function StoryItem({story}) {
  return (
    <Link to={`/story/${story._id}`} className="story-card" story={story}>
      <h2 className='story-title'>{ story.title }</h2>
      <p className="story-author">{ story.author.username }</p>
    </Link>
  )
}

export default StoryItem