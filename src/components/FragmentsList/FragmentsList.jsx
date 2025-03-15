import React from 'react'

function FragmentsList({fragments}) {
  return (
    <article className='acepted-fragments'>
      { fragments.length > 0 ?
        <div>
          { fragments.map((fragment) => (
            <div key={fragment._id}>
              <p>{fragment.content}</p>
              <p>{fragment.author.username}</p>
            </div>
          ))}
        </div>
        : <p>No fragments yet.</p>
      }
    </article>
  )
}

export default FragmentsList