import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './StoryDetailsView.css';
import FragmentsList from '../../components/FragmentsList/FragmentsList';
import { createFragment, updateFragment, deleteFragment, acceptFragment } from '../../services/fragments';
import { fetchStoryById } from '../../services/stories';
import { getUserVotes, addVote, removeVote } from '../../services/votes';
import { useAuth } from '../../context/auth.context';
import Pagination from '../../components/Pagination/Pagination';
import AIChatToggle from '../../components/AIChatToggle/AIChatToggle';

function StoryDetailsView() {
    const { authToken, user } = useAuth();
    const { id } = useParams();
    const [story, setStory] = useState({});
    const [content, setContent] = useState("");
    const [votedFragments, setVotedFragments] = useState([]);

    const pendingFragments = story.pendingFragments || [];
    const acceptedFragments = story.fragments || [];

    // Estado para paginar los fragmentos de la historia
    const [currentFragmentPage, setCurrentFragmentPage] = useState(1);
    const fragmentsPerPage = 5;
    const totalFragmentPages = Math.ceil(acceptedFragments.length / fragmentsPerPage);
    const startIndex = (currentFragmentPage - 1) * fragmentsPerPage;
    const displayedFragments = acceptedFragments.slice(startIndex, startIndex + fragmentsPerPage);

      // Función para refrescar la historia
    const refreshStory = useCallback(async () => {
        try {
            const data = await fetchStoryById(id);
            setStory(data);
        } catch (error) {
            console.error(error);
        }
    }, [id])

    useEffect(() => {
        refreshStory();
    }, [refreshStory]);

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const data = await fetchStoryById(id);
                setStory(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStory();
    }
        , [id]);

    useEffect(() => {
        const fetchUserVoted = async () => {
            try {
                const data = await getUserVotes(authToken);
                setVotedFragments(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserVoted();
    }, [authToken]);

    const handleVote = async (fragmentId) => {
        try {
            await addVote(fragmentId, authToken);
            setVotedFragments([...votedFragments, fragmentId]);
            // Volver a actualizar la historia para que se refleje el voto
            const data = await fetchStoryById(id);
            setStory(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveVote = async (fragmentId) => {
        try {
            await removeVote(fragmentId, authToken);
            setVotedFragments(votedFragments.filter((id) => id !== fragmentId));
            // Volver a actualizar la historia para que se refleje el voto
            const data = await fetchStoryById(id);
            setStory(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            await createFragment(id, content, authToken);
            // Después de crear el fragmento, volvemos a actualizar la historia
            const data = await fetchStoryById(id);
            setStory(data);
            setContent("");
        } catch (error) {
            console.error(error);
        }
    }

    // Funciones para editar, eliminar y aceptar fragmentos
    const handleEditFragment = async (fragmentId) => {
        const newContent = prompt("Edit your fragment:");
        if (!newContent) return;
        try {
            await updateFragment(fragmentId, newContent, authToken);
            const data = await fetchStoryById(id);
            setStory(data);
        } catch (error) {
            console.error(error);
        }
    };
    // para editar, eliminar y aceptar fragmento
    const handleDeleteFragment = async (fragmentId) => {
        if (!window.confirm("Are you sure you want to delete this fragment?")) return;
        try {
            await deleteFragment(fragmentId, authToken);
            const data = await fetchStoryById(id);
            setStory(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAcceptFragment = async (fragmentId) => {
        try {
            // Se asume que el endpoint acepta la historia ID y el fragment ID
            await acceptFragment(id, fragmentId, authToken);
            const data = await fetchStoryById(id);
            setStory(data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!story) {
        return <p>Loading...</p>
    }
    return (
        <section className='story-section'>
            <article className='content'>
                <h2 className='story-title title-view'>
                    <ion-icon name="bookmark"></ion-icon>
                    {story.title}
                </h2>
                {story.author && 
                    <p className='story-author v-author'>
                        {story.author.username}
                    </p>
                }
                <p className='story-content'>{story.description}</p>
            </article>
            {
                authToken &&
                story.status !== 'completed' &&
                pendingFragments.length < 3 &&
                <>
                    <form className='fragment-form' onSubmit={handleSubmit}>
                        <h2 className='fragment__h2'>Add fragment</h2>
                        <textarea name="content" cols="50" rows="10" value={content} id="content" placeholder='Tell me what happens next' onChange={(e) => setContent(e.target.value)}></textarea>
                        <button className='add-button' type='submit'>Add fragment</button>
                    </form>
                    <AIChatToggle />
                </>
            }
            <article className={pendingFragments.length === 0 ? 'empty' : 'pending-fragments'}>                
                <h3 className='fragments__h3'>We have fragments in process, vote for the one you like.</h3>
                {authToken && pendingFragments.length > 0 &&
                    <div className='pending-f'>
                        {pendingFragments.map((fragment) => (
                            <div className='fragment' key={fragment._id}>
                                <span className='fragment-author'>{fragment.author.username}</span>
                                <p className='fragment-content'>{fragment.content}</p>
                                <div className="options">
                                    <button className='fragment-vote'
                                        disabled={votedFragments.includes(fragment._id)}
                                        onClick={() => handleVote(fragment._id)
                                        }>
                                            <ion-icon name="heart"></ion-icon>
                                        </button>
                                    <span className='count'>{fragment.votes}</span>
                                    <button className='fragment-delete-vote'
                                        disabled={!votedFragments.includes(fragment._id)}
                                        onClick={() => handleRemoveVote(fragment._id)}
                                    >
                                       <ion-icon name="heart-dislike"></ion-icon> 
                                    </button>
                                </div>
                                {/* Si el usuario es el autor del fragmento, puede editar/eliminar */}
                                {user && fragment.author && (user._id === fragment.author._id) && (
                                    <>
                                        <button onClick={() => handleEditFragment(fragment._id)}>Edit</button>
                                        <button onClick={() => handleDeleteFragment(fragment._id)}>Delete</button>
                                    </>
                                )}
                                {/* Si el usuario es el autor de la historia, puede aceptar fragmentos */}
                                {user && story.author && (user._id === story.author._id) && (
                                    <button onClick={() => handleAcceptFragment(fragment._id)}>Accept</button>
                                )}
                            </div>
                        ))}
                    </div>
                }
            </article>
            <FragmentsList fragments={displayedFragments} />
            {
                totalFragmentPages > 1 && (
                    <Pagination totalPages={totalFragmentPages} currentPage={currentFragmentPage} onPageChange={setCurrentFragmentPage}/>
                )
            }
        </section>
    )
}

export default StoryDetailsView