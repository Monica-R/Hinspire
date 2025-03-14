import './MyStoriesView.css';
import React from 'react'
import { useCallback, useEffect, useState } from 'react'
import StoryList from '../../components/StoryList/StoryList';
import { useAuth } from '../../context/auth.context';
import { addStory, fetchStoriesOfUser } from '../../services/stories';


function MyStoriesView() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stories, setStories] = useState([]);
  const { authToken, user, isLoading, startLoading, stopLoading } = useAuth();

  const getStories = useCallback(async () => {
    try {
      const data = user && user._id ? await fetchStoriesOfUser(user._id) : [];
      setStories(data);
    } catch (error) {
      console.error(error);
    }
  }, [user]);
  
  useEffect(() => {
    getStories();
  }, [getStories]);
  

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      startLoading();
      await addStory(title, description, authToken);
      // Vacías los estados una vez añadida la historia
      setTitle("");
      setDescription("");
      getStories();
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
  };

  return (
    <section className='story-list'>
      { isLoading ? (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
          <ClipLoader color="#36d7b7" size={100}/>
        </div>      
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title"></label>
            <input type="text" value={title} id="title" name="title" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
            <label htmlFor="description"></label>
            <textarea id="description" value={description} name="description" placeholder="Description" onChange={(e) => setDescription(e.target.value)}></textarea>
            <button type="submit">Create story</button>
          </form>
          <StoryList stories={stories} getStories={getStories}/>
        </>
      )}
    </section>
  )
}

export default MyStoriesView