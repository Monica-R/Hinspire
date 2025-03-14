import React from 'react'
import { useEffect, useState } from 'react'
import { fetchStories } from '../../services/stories';
import StoryList from '../../components/StoryList/StoryList';
import { useAuth } from '../../context/auth.context';
import './AllStoriesView.css';
import { ClipLoader } from 'react-spinners';

function AllStoriesView() {

  const [stories, setStories] = useState([]);
  const { isLoading, startLoading, stopLoading } = useAuth();

  useEffect(() => {
    const getStories = async () => {
      try {
        startLoading();
        const data = await fetchStories();
        setStories(data);
      } catch (error) {
          console.error(error);
      } finally {
        stopLoading();
      }
    }
      getStories();
  }, [startLoading, stopLoading]);
  return (
    <section className='story-list'>
      { isLoading ? (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
          <ClipLoader color="#36d7b7" size={100}/>
        </div>
      ) : (
        <StoryList stories={stories}/>
      )}
    </section>
  )
}

export default AllStoriesView