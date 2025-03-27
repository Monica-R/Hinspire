import React from 'react'
import './FragmentList.css'
function FragmentsList({fragments}) {
  return (
    <article className='acepted-fragments'>
      { fragments.length > 0 ?
        <div>
          { fragments.map((fragment) => {
            const formattedDate = new Date(fragment.createdAt).toLocaleDateString();
            return (
              <div key={fragment._id} className='fragment-item'>
                <span className='fragment-date'>{formattedDate}</span>
                <span className='fragment-item-author'>{fragment.author.username}</span>
                <p className='fragment-content'>{fragment.content}</p>
              </div>
            )
          })}
        </div>
        : <p>No fragments yet.</p>
      }
    </article>
  )
}

export default FragmentsList