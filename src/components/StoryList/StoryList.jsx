import './StoryList.css';
import React from 'react'
import { useEffect, useState } from 'react'
import { fetchStories, fetchStoriesOfUser } from '../../services/stories';
import StoryItem from '../StoryItem/StoryItem';
import { useAuth } from '../../context/auth.context';
import { useLocation } from 'react-router-dom';

function StoryList() {

    const [stories, setStories] = useState([]);
    const { user } = useAuth();
    const location = useLocation();

    // Determina si estamos en la ruta de "Mis historias"
    const isMyStoriesRoute = location.pathname.includes('/stories/user');

    console.info('fullpath', location.pathname + location.search + location.hash);

    useEffect(() => {
        const getStories = async () => {
            try {
                let data;
                if(isMyStoriesRoute) {
                    data = user._id ? await fetchStoriesOfUser(user._id) : ["not stories"];
                    setStories(data);
                    console.info(data)
                } else {
                    data = await fetchStories();
                    setStories(data);
                    console.log(data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getStories();
    }, [isMyStoriesRoute, user?._id, location.pathname]);

    const getStoriesData = stories.length === 0 ? 'No Stories yet.' 
    : stories.map((story) => <StoryItem key={story._id} story={story}/>);

  return (
    <>{ getStoriesData }</>
  )
}

export default StoryList