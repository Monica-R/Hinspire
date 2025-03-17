import React, { useCallback } from 'react'
import { useEffect, useState } from 'react'
import { fetchStories } from '../../services/stories';
import StoryList from '../../components/StoryList/StoryList';
import { useAuth } from '../../context/auth.context';
import './AllStoriesView.css';
import { ClipLoader } from 'react-spinners';

function AllStoriesView() {

  const [stories, setStories] = useState([]);
  const { isLoading, startLoading, stopLoading } = useAuth();

  const getStories = useCallback(async () => {
    try {
      startLoading();
      const data = await fetchStories();
      setStories(data);
    } catch (error) {
        console.error(error);
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading])
  useEffect(() => {
      getStories();
  }, [getStories]);
  return (
    <section className='story-list'>
      <h2 className='storylist__h2'>Explore all stories</h2>
      { isLoading ? (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
          <ClipLoader color="#da667b" size={100}/>
        </div>
      ) : (
        <StoryList stories={stories}/>
      )}
    </section>
  )
}

export default AllStoriesView