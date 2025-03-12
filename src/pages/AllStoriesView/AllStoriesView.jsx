import React from 'react'
import { useEffect, useState } from 'react'
import { fetchStories } from '../../services/stories';
import StoryList from '../../components/StoryList/StoryList';
import './AllStoriesView.css';

function AllStoriesView() {

  const [stories, setStories] = useState([]);

  useEffect(() => {
    const getStories = async () => {
      try {
        const data = await fetchStories();
        setStories(data);
      } catch (error) {
          console.error(error);
      }
    }
      getStories();
  }, []);
  return (
    <section className='story-list'>
      <StoryList stories={stories}/>
    </section>
  )
}

export default AllStoriesView