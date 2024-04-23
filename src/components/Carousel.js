import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

function Carousel() {
  const [topPicksMovies, setTopPicksMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const interval = 5000; // 5 seconds

  const fetchTopPicksMovies = () => {
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=731e37b9dcf15c6797f4888e7858a66d`)
      .then((res) => {
        setTopPicksMovies(res.data.results);
      })
      .catch((error) => {
        console.error('Error fetching top picks movies:', error);
      });
  };

  useEffect(() => {
    fetchTopPicksMovies();
  }, []);

  useEffect(() => {
    const autoPlay = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === topPicksMovies.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);
    return () => clearInterval(autoPlay);
  }, [topPicksMovies, interval]);


  const prevSlide = () => {

    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? topPicksMovies.length - 1 : prevIndex - 1
    );

  };

  const nextSlide = () => {

    setActiveIndex((prevIndex) =>
      prevIndex === topPicksMovies.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      {topPicksMovies.length > 0 && (
        <div className='relative ml-10 mr-10 overflow-hidden'>
          <button onClick={prevSlide} className='text-white absolute top-40 z-10 w-12 h-14 bg-gray-900 bg-opacity-60'>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>

          <div className={'flex ' }>
            <div >
              <div className='h-[30vh] md:h-[55vh] w-[130vh] bg-center bg-top bg-cover backdrop-blur-3xl flex items-end bg-no-repeat'
                style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${topPicksMovies[activeIndex].backdrop_path})` }}>
              </div>
            </div>
            <div className='h-[30vh] md:h-[55vh] text-white bg-gray-900 p-4 bg-opacity-30'>
              <div className='text-3xl font-bold pb-5 text-sky-600'>
                {topPicksMovies[activeIndex].original_title}
              </div>
              <div>{topPicksMovies[activeIndex].overview}</div>
            </div>
          </div>
          <button onClick={nextSlide} className='text-white text-white absolute top-40 right-0 z-10 w-12 h-14 bg-gray-900 bg-opacity-60'>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      )}
    </>
  );
}

export default Carousel;
