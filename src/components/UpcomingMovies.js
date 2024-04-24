import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import { faFilm, faCheck, faPlus, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

function UpcomingMovies() {

    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [watchlist, setWatchlist] = useState(JSON.parse(localStorage.getItem('imdb')) || [])
    const [activeIndex, setActiveIndex] = useState(0);

    const fetchUpcomingMovies = async () => {
        const currentDate = new Date();
        let page = 1;
        let upcomingMovies = [];
        let moviesCount = 0;

        while (upcomingMovies.length < 12) {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=731e37b9dcf15c6797f4888e7858a66d&page=${page}`);
                const movies = response.data.results.filter(movie => new Date(movie.release_date) > currentDate);

                if (movies.length === 0) {
                    break;
                }

                // Determine how many more movies can be added without exceeding 10
                const remainingMoviesCount = 12 - upcomingMovies.length;
                upcomingMovies = upcomingMovies.concat(movies.slice(0, remainingMoviesCount));
                moviesCount += movies.length;
                page++;
            } catch (error) {
                console.error('Error fetching upcoming movies:', error);
                break; // Break the loop if an error occurs
            }
        }

        setUpcomingMovies(upcomingMovies);
    }


    useEffect(() => {
        fetchUpcomingMovies()
    }, [])

    //add to watchlist
    const addToWatchlist = (movie) => {
        const newWatchlist = [...watchlist, movie]
        setWatchlist(newWatchlist)
        localStorage.setItem('imdb', JSON.stringify(newWatchlist))
    }

    //remove from watchlist
    const removeFromWatchlist = (movie) => {
        const filteredWatchlist = watchlist.filter((m) => {

            return m.id != movie.id
        })
        setWatchlist(filteredWatchlist)
        localStorage.setItem('imdb', JSON.stringify(filteredWatchlist))
    }

    const prevSlide = () => {

        setActiveIndex((prevIndex) =>
          prevIndex === 0 ? upcomingMovies.length - 1 : prevIndex - 1
        );
    
      };
    
      const nextSlide = () => {
    
        setActiveIndex((prevIndex) =>
          prevIndex === upcomingMovies.length - 1 ? 0 : prevIndex + 1
        );
      };

      console.log(activeIndex)

    //console.log(upcomingMovies)
    return (
        <>
            <div className='p-3 w-full  '>
                <div className='text-2xl mb-3 font-bold text-amber-400 pl-2'>
                    Upcoming Movies
                </div>
                <div className='flex flex-wrap justify-center'>
                    <div className='carousel-container ml-10 mr-10'>
                        <button onClick={prevSlide} className='text-white absolute top-40 left-5 z-10 w-12 h-14 bg-gray-900 bg-opacity-60' disabled={activeIndex === 0}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>

                        <div className='carousel-wrapper' style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                            {upcomingMovies.map((movie) => {
                                return <div key={movie.id} className='w-[190px] h-[65vh] m-5 hover:scale-110 duration-300 rounded-lg'>
                                    <div className='w-[190px] h-[40vh] bg-center bg-cover md:h[40vh] md:w[180px] rounded-t-lg'
                                        style={{
                                            backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path})`
                                        }}>

                                    </div>
                                    <div className='w-[190px] h-[25vh] bg-zinc-900 rounded-b-lg pt-2'>
                                        <div className='text-slate-50 w-full pl-2'>
                                            <span className='pr-2 text-sky-600'><FontAwesomeIcon icon={faFilm} /></span>
                                            {movie.release_date.substring(8, 10) + "/" + movie.release_date.substring(5, 7) + "/" + movie.release_date.substring(0, 4)}
                                        </div>
                                        <div className='h-[5vh] text-slate-50 font-bold w-full pl-2 pr-2 mt-2'>
                                            {movie.title.length > 50 ? movie.title.substring(0, 50) + "..." : movie.title}
                                        </div>
                                        <div className='w-[170px] h-[5vh] text-sky-600 text-center p-1 bg-opacity-40 bg-black rounded-l m-2 mt-12'>

                                            {
                                                watchlist.some(item => { return JSON.stringify(item.id) === JSON.stringify(movie.id) }) ? (
                                                    <button onClick={() => removeFromWatchlist(movie)} ><span className='pr-2'><FontAwesomeIcon icon={faCheck} /></span>Watchlist</button>

                                                ) : (
                                                    <button onClick={() => addToWatchlist(movie)} ><span className='pr-2'><FontAwesomeIcon icon={faPlus} /></span>Watchlist</button>
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>
                            })}

                        </div>

                        <button onClick={nextSlide} className='text-white text-white absolute top-40 right-0 z-10 w-12 h-14 bg-gray-900 bg-opacity-60' disabled={activeIndex === 1}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpcomingMovies