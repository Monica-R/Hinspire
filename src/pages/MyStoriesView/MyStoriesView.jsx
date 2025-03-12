import './MyStoriesView.css';
import React from 'react'
import StoryList from '../../components/StoryList/StoryList';

function MyStoriesView() {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Story created');
  };

  return (
    <section className='story-list'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title"></label>
        <input type="text" id="title" name="title" placeholder="Title" />
        <label htmlFor="description"></label>
        <textarea id="description" name="description" placeholder="Description"></textarea>
        <button type="submit">Create story</button>
      </form>
      <StoryList />
    </section>
  )
}

export default MyStoriesView