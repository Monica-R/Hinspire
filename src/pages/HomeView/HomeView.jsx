import React from 'react'
import { Link } from 'react-router-dom';
import './HomeView.css';

function HomeView() {
  return (
    <>
      <section className='section-one'>
        {/* <div className="layer-container">
          <div className="img-layer img-1"></div>
          <div className="img-layer img-2"></div>
          <div className="img-layer img-3"></div>
          <div className="img-layer img-4"></div>
          <div className="img-layer img-5"></div>
        </div> */}
        <div className="header__banner">
          <h1 className="header__h1"><span className='span-1'>Create.</span> Collaborate. <span className='span-2'>Get inspired.</span></h1>
          <p className='header__p'>
            Designed to awaken your 
            creativity, here your ideas come to life 
            through innovative tools that simplify the 
            creative process. Connect, share and create 
            unforgettable stories that transcend borders.
          </p>
          <Link className='signup-link sign-up' to="/signup">Let's create →</Link>
        </div>

        <div className="image-banner">
          <img src="/images/banner-1.png" alt="banner-1" />
        </div>

      </section>
      <section className='section-two'>
        <h2 className='section-one__h2'>Unleash your creativity!</h2>
        <div className="pictures">
          <figure className="pic">
            <img src="/images/icons/icon-1.png" alt="icon-1" />
            <figcaption>Create</figcaption>
          </figure>
          <figure className="pic">
            <img src="/images/icons/icon-2.png" alt="icon-2" />
            <figcaption>Get involved</figcaption>
          </figure>
          <figure className="pic">
            <img src="/images/icons/icon-3.png" alt="icon-3" />
            <figcaption>Vote for your favorite</figcaption>
          </figure>
        </div>
      </section>
    </>
  )
}

export default HomeView