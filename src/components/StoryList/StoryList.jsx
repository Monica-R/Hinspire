import './StoryList.css';
import React from 'react'
import StoryItem from '../StoryItem/StoryItem';

function StoryList({stories}) {

    const getStoriesData = stories.length === 0 || !stories ? 'No Stories yet.' 
    : stories.map((story) => <StoryItem key={story._id} story={story}/>);

  return (
    <>{ getStoriesData }</>
  )
}

export default StoryList