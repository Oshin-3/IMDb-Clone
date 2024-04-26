import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import { faStar, faCheck, faPlus, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

function TopRated() {

    const [topRatedMovies, setTopRatedMovies] = useState([])
    const [watchlist, setWatchlist] = useState(JSON.parse(localStorage.getItem('imdb')) || [])
    const [activeIndex, setActiveIndex] = useState(0);

    const fetchTopRatedMovies = async () => {
           
        let topRatedMovies = [];

        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=731e37b9dcf15c6797f4888e7858a66d`);
            topRatedMovies = response.data.results.sort((a, b) => {
                return b.release_date - a.release_date
            });

        } catch (error) {
            console.error('Error fetching top rated movies:', error);
        }

        setTopRatedMovies(topRatedMovies);
    }


    useEffect(() => {
        fetchTopRatedMovies()
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
            prevIndex === 0 ? topRatedMovies.length - 1 : prevIndex - 1
        );

    };

    const nextSlide = () => {

        setActiveIndex((prevIndex) =>
            prevIndex === topRatedMovies.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <>
            <div className=' w-full'>
                <div className='text-2xl mt-5 ml-7 font-bold text-amber-400 pl-2'>
                    Top Rated Movies
                </div>
                <div>
                    <div className='carousel-container ml-10 mr-10 border-solid border-transparent border-4'>
                        <button onClick={prevSlide} className={`text-white text-white absolute top-40 left-5 z-10 w-12 h-14 ${activeIndex == 0 ? "bg-gray-500" : "bg-gray-900"} bg-opacity-60`} disabled={activeIndex == 0 ? true : false}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>

                        <div className='carousel-wrapper' style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                            {topRatedMovies.map((movie, index) => {
                                
                                return <div key={movie.id} className={`w-[190px] h-[65vh] m-5 hover:scale-110 duration-300 rounded-lg ${index%5 == 0 ? "mr-6" : ""}`}>
                                    <div className='w-[190px] h-[40vh] bg-center bg-cover md:h[40vh] md:w[180px] rounded-t-lg'
                                        style={{
                                            backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path})`
                                        }}>

                                    </div>
                                    <div className='w-[190px] h-[25vh] bg-zinc-900 rounded-b-lg pt-2'>
                                        <div className='text-slate-50 w-full pl-2'>
                                            <span className='pr-2'><FontAwesomeIcon icon={faStar} color='gold' /></span>
                                            {movie.vote_average.toFixed(1) == 0 ? "Coming Soon" : movie.vote_average.toFixed(1)}
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

                        <button onClick={nextSlide} className={`text-white text-white absolute top-40 right-5 z-10 w-12 h-14 ${activeIndex == 3 ? "bg-gray-500" : "bg-gray-900"} bg-opacity-60`} disabled={activeIndex == 3 ? true : false}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopRated