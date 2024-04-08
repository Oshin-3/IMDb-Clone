import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react'
import Pagination from './Pagination'

function Movies() {

    const [movies, setMovies] = useState([])
    //favorite movies list to add in the watchlist page
    const [watchlist, setWatchlist] = useState([])

    //add to watchlist
    const addToWatchlist = (id) => {
        const newWatchlist = [...watchlist, id]
        setWatchlist(newWatchlist)
    }

    //remove from watchlist
    const removeFromWatchlist = (id) => {
        const filteredWatchlist = watchlist.filter((movie) => {
            
            return movie != id
        })
        setWatchlist(filteredWatchlist)
    }

    //fetch the movies details from API using axios
    const fetchMovies = (pageNum) => {
        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=731e37b9dcf15c6797f4888e7858a66d&page=${pageNum}`)
            .then((res) => {
                setMovies(res.data.results)
            })
    }
    useEffect(() => {
        fetchMovies(1)
        
    }, [])


    return (
        <div className='p-3 mt-2 w-full '>
            <div className='text-2xl mb-3 font-bold text-amber-400 pl-2'>
                Trending Movies
            </div>
            <div className='flex flex-wrap justify-center'>
                {movies.map((movie) => {
                    return <div key={movie.id}  className='w-[190px] h-[65vh] mt-5 mb-5 ml-4 mr-4 hover:scale-110 duration-300 rounded-lg'>
                        <div className='w-[190px] h-[40vh] bg-center bg-cover md:h[40vh] md:w[180px] rounded-t-lg'
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path})`
                            }}>

                        </div>
                        <div className='w-[190px] h-[25vh] bg-zinc-900 rounded-b-lg pt-2'>
                            <div className='text-slate-50 w-full pl-2'>
                                <span className='pr-2'><FontAwesomeIcon icon={faStar} color='gold' /></span>
                                {movie.vote_average.toFixed(2) == 0 ? "Coming Soon" : movie.vote_average.toFixed(2)}
                            </div>
                            <div className='h-[5vh] text-slate-50 font-bold w-full pl-2 pr-2 mt-2'>
                                {movie.title.length > 50 ? movie.title.substring(0, 50) + "..." : movie.title}
                            </div>
                            <div className='w-[170px] h-[5vh] text-sky-600 text-center p-1 bg-opacity-40 bg-black rounded-l m-2 mt-12'>
                                
                                {
                                    watchlist.includes(movie.id) === false ? (
                                        <button onClick={() => addToWatchlist(movie.id)} ><span className='pr-2'><FontAwesomeIcon icon={faPlus}/></span>Watchlist</button>
                                    ) : (
                                        <button onClick={() => removeFromWatchlist(movie.id)} ><span className='pr-2'><FontAwesomeIcon icon={faCheck}/></span>Watchlist</button>
                                    )
                                }
                                
                            </div>
                        </div>
                    </div>
                })}


            </div>
            
            
            <Pagination onPageChange={fetchMovies} />
            
            
        </div>
    )
}

export default Movies