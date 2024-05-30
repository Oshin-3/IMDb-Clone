import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import { fetchCorouselData, setActiveIndex } from '../stores/carouselSlice';
import { useDispatch, useSelector } from 'react-redux';


function Carousel() {
  //const [topPicksMovies, setTopPicksMovies] = useState([]);
  const {data : topPicksMovies, status, activeIndex : activeIndex} = useSelector((status) => status.carousel)
  //const [activeIndex, setActiveIndex] = useState(0);

  const dispatch = useDispatch()

  const interval = 5000; // 5 seconds

  const fetchTopPicksMovies = () => {
    dispatch(fetchCorouselData())
  };

  useEffect(() => {
    fetchTopPicksMovies();
  }, []);

  useEffect(() => {
    const autoPlay = setInterval(() => {
      // setActiveIndex((prevIndex) =>
      //   prevIndex === topPicksMovies.length - 1 ? 0 : prevIndex + 1
      // );
      dispatch(setActiveIndex({topPicksMovies : topPicksMovies, nextSlice : true, activeIndex : activeIndex}))
    }, interval);
    return () => clearInterval(autoPlay);
  }, [topPicksMovies, interval, activeIndex, dispatch]);


  const prevSlide = () => {

    // setActiveIndex((prevIndex) =>
    //   prevIndex === 0 ? topPicksMovies.length - 1 : prevIndex - 1
    // );
    dispatch(setActiveIndex({topPicksMovies : topPicksMovies, nextSlice : false, activeIndex : activeIndex}))
  };

  const nextSlide = () => {

    // setActiveIndex((prevIndex) =>
    //   prevIndex === topPicksMovies.length - 1 ? 0 : prevIndex + 1
    // );
    dispatch(setActiveIndex({topPicksMovies : topPicksMovies, nextSlice : true, activeIndex : activeIndex}))
  };

  
  if (status == 'loading') return <h1>Loading...</h1>
  if (status == 'error') return <h1>Error loading data</h1>

  return (
    <>
      {topPicksMovies.length > 0 && (
        <div className='carousel-container ml-10 mr-10'>
          <button onClick={prevSlide} className='text-white absolute top-40 z-10 w-12 h-14 bg-gray-900 bg-opacity-60'>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>

          <div className='carousel-wrapper' style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {topPicksMovies.map((movie, index) => (
              <div key={index} className='carousel-slide'>
                <div className='flex'>
                  <div className='h-[30vh] md:h-[55vh]  w-[500vh] bg-fixed bg-center bg-top bg-cover backdrop-blur-3xl flex items-end bg-no-repeat'
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}>
                  </div>
                  <div className='h-[30vh] md:h-[55vh] w-[150vh] text-white bg-gray-900 p-4 bg-opacity-30'>
                    <div className='text-3xl font-bold pb-5 text-sky-600'>
                      {movie.original_title}
                    </div>
                    <div>{movie.overview}</div>
                  </div>
                </div>
              </div>
            ))}
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
