import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function Watchlist() {

  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    let moviesFromLocalstorage = localStorage.getItem('imdb')
    moviesFromLocalstorage = JSON.parse(moviesFromLocalstorage)

    setFavorites(moviesFromLocalstorage)
  }, [])

  return (
    <div className='flex justify-center w-full bg-gray-300'>
      <div className='w-[120vh] bg-slate-50 mt-3'>
        <div className='h-[70px] p-4 text-3xl border-b-4 mb-3'>
          Your Watchlist
        </div>
        <div>
          {
            favorites.map((favMovie) => {
              return <div key={favMovie.id} className='flex h-[35vh] border-b-2 p-4 mb-3'>
                <div className='rounded-xl w-[17vh] h-[25vh] bg-center bg-cover md:h[40vh] md:w[180px]'
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${favMovie.poster_path})`
                  }}>

                </div>
                <div className='ml-3 w-[100vh]'>
                  <div className='text-xl text-sky-600 font-bold'>
                    {favMovie.title.length > 50 ? favMovie.title.substring(0, 50) + "..." : favMovie.title}
                  </div>
                  <div className='text-zinc-400 text-xs'>
                    {favMovie.release_date.substring(0,4)} 
                    {/* | 1h 46m | G | Animation, Adventure, Comedy */}
                  </div>
                  <div className='pt-1'>
                    <span className='pr-2'><FontAwesomeIcon icon={faStar} color='gold' /></span>
                    {favMovie.vote_average.toFixed(1) == 0 ? "Coming Soon" : favMovie.vote_average.toFixed(1)}
                  </div>
                  {/* <div className='text-sky-600'>
                    John Lasseter, Bradford Lewis | Owen Wilson, Larry the Cable Guy, Michael Caine
                  </div> */}
                  <div className='text-justify pt-2'>
                    {favMovie.overview.length > 400 ? favMovie.overview.substring(0, 400) + "..." : favMovie.overview}
                  </div>
                </div>
              </div>
            })
          }




        </div>
      </div>

    </div>
  )
}

export default Watchlist