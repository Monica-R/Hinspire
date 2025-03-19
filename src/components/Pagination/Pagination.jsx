import React from 'react';
import './Pagination.css';

function Pagination({totalPages, currentPage, onPageChange}) {
    const pages = [];

    // Recorremos con un for la cantidad de páginas:
    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <button className={currentPage === i ? 'current-page' : 'page-number'} key={i} onClick={() => onPageChange(i)}> { i }</button>
        );
    }

  return (
    <section className='pagination'>
      <button className='page-button' onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Prev
      </button>
      { pages }
      <button className='page-button' onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </section>
  )
}

export default Pagination