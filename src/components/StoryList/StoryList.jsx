import './StoryList.css';
import React from 'react'
import { useEffect, useState } from 'react'
import { fetchStories } from '../../services/stories';
import StoryItem from '../StoryItem/StoryItem';

function StoryList() {

    const [stories, setStories] = useState([]);

    useEffect(() => {
        getStories();
    }, []);

    const getStories = async () => {
        try {
            const data = await fetchStories();
            setStories(data);
        } catch (error) {
            console.error(error);
        }
    }

    const getStoriesData = stories.length === 0 ? 'No Stories yet.' 
    : stories.map((story) => <StoryItem key={story._id} story={story}/>);

  return (
    <>{ getStoriesData }</>
  )
}

export default StoryList