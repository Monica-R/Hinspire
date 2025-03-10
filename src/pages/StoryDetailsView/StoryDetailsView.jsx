import React, { useEffect } from 'react'
import { useParams, useState } from 'react-router-dom';
import './StoryDetailsView.css';
import FragmentsList from '../../components/FragmentsList/FragmentsList';
import { getFragmentsOfStory } from '../../services/fragments';

function StoryDetailsView({ story }) {
    const { _id } = useParams();
    const [fragmentsStory, setFragmentsStory] = useState([]);
    //const [fragment, setFragment] = useState('');

    useEffect(() => {
        const fetchFragments = async () => {
            try {
               const data = await getFragmentsOfStory(_id);
               setFragmentsStory(data); 
            } catch (error) {
               console.error(error); 
            }
        };
        fetchFragments();
    }
    , [fragmentsStory, _id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted');
    }
  return (
    <section className='story-section'>
        <article className='content'>            
            <h2 className='story-title'>{ story.title }</h2>
            <p className='story-author'>{ story.author.username }</p>
            <p className='story-content'>{ story.desription }</p>
        </article>
        <form onSubmit={handleSubmit}>
            <textarea name="content" id="content" placeholder='Tell me what happens next'></textarea>
            <button type='submit'>Add fragment</button>
        </form>
        <article className='fragments-content'>
            <FragmentsList fragments={fragmentsStory}/>
        </article>
    </section>
  )
}

export default StoryDetailsView