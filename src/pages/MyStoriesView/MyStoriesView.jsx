import './MyStoriesView.css';
import React from 'react'
import { useEffect, useState } from 'react'
import StoryList from '../../components/StoryList/StoryList';
import { useAuth } from '../../context/auth.context';
import { addStory, fetchStoriesOfUser } from '../../services/stories';


function MyStoriesView() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stories, setStories] = useState([]);
  const { authToken, user } = useAuth();

  useEffect(() => {
    const getStories = async () => {
      try {
        const data = user && user._id ? await fetchStoriesOfUser(user._id) : [];
        setStories(data);
      } catch (error) {
        console.error(error);
      }
    }
    getStories();
  }, [user]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      await addStory(title, description, authToken);
      console.log('Story created');
      // Vacías los estados una vez añadida la historia
      setTitle("");
      setDescription("");   
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className='story-list'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title"></label>
        <input type="text" value={title} id="title" name="title" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
        <label htmlFor="description"></label>
        <textarea id="description" value={description} name="description" placeholder="Description" onChange={(e) => setDescription(e.target.value)}></textarea>
        <button type="submit">Create story</button>
      </form>
      <StoryList stories={stories}/>
    </section>
  )
}

export default MyStoriesView