import './MyStoriesView.css';
import React from 'react'
import { useCallback, useEffect, useState } from 'react'
import StoryList from '../../components/StoryList/StoryList';
import { useAuth } from '../../context/auth.context';
import { addStory, fetchStoriesOfUser } from '../../services/stories';
import Pagination from '../../components/Pagination/Pagination';


function MyStoriesView() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stories, setStories] = useState([]);
  const { authToken, user } = useAuth();

  // para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 5;

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
      await addStory(title, description, authToken);
      // Vacías los estados una vez añadida la historia
      setTitle("");
      setDescription("");
      getStories();
    } catch (error) {
      console.error(error);
    }
  };


    // Para la paginación
    const startIndex = (currentPage - 1) * storiesPerPage;
    const selectedStories = stories.slice(startIndex, startIndex + storiesPerPage);
    const totalPages = Math.ceil(stories.length / storiesPerPage);

  return (
    <section className='story-list'>       
      <form className='story-form' onSubmit={handleSubmit}>
        <h2 className='story-form__h2'>Create story</h2>
        <label htmlFor="title"></label>
        <input className='input-title' type="text" value={title} id="title" name="title" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
        <label htmlFor="description"></label>
        <textarea id="description" rows="10" value={description} name="description" placeholder="Description" onChange={(e) => setDescription(e.target.value)}></textarea>
        <button className='story-button' type="submit">Create story</button>
      </form>
      <StoryList stories={selectedStories} getStories={getStories}/>
      { totalPages > 1 &&
        (<Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage}/>)
      }      
    </section>
  )
}

export default MyStoriesView