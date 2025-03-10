import './StoryItem.css';
import React from 'react'

function StoryItem({story}) {
  console.info(story);
  return (
    <div className="story-card">
      <h2 className='story-title'>{ story.title }</h2>
      <p className="story-author">{ story.author.username }</p>
    </div>
  )
}

export default StoryItem