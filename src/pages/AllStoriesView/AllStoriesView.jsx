import React from 'react'
import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners';
import { useAuth } from '../../context/auth.context';
import { fetchStories } from '../../services/stories';
import StoryList from '../../components/StoryList/StoryList';
import './AllStoriesView.css';
import Pagination from '../../components/Pagination/Pagination';

function AllStoriesView() {

  const [stories, setStories] = useState([]);
  const { isLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 5;

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

  // Para la paginación
  const startIndex = (currentPage - 1) * storiesPerPage;
  const selectedStories = stories.slice(startIndex, startIndex + storiesPerPage);
  const totalPages = Math.ceil(stories.length / storiesPerPage);

  return (
    <section className='story-list'>     
      { isLoading ? (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
          <ClipLoader color="#da667b" size={100}/>
        </div>
      ) : (
        <>
          <StoryList stories={selectedStories}/>
          { totalPages > 1 &&
            (<Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage}/>)
          }
        </>
      )}
    </section>
  )
}

export default AllStoriesView