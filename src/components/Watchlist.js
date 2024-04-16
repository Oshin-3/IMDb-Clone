import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Movies from './Movies';

function Watchlist() {

  const [favorites, setFavorites] = useState([])
  const [genres, setGenres] = useState([])
  let [filteredArray, setFilteredArray] = useState([])


  let genreIds = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western"
  }

  useEffect(() => {
    let moviesFromLocalstorage = localStorage.getItem('imdb')
    moviesFromLocalstorage = JSON.parse(moviesFromLocalstorage) || []

    setFavorites(moviesFromLocalstorage)
    setFilteredArray(moviesFromLocalstorage)
  }, [])

  useEffect(() => {
    //let temp = favorites.map((movie) => genreIds[movie.genre_ids[0]])
    let temp = favorites.map((movie) => {
      return movie.genre_ids.map((genre) => genreIds[genre] + " ")
    })

    // let removeDup = []
    // temp.forEach((genres) => {
    //   genres.forEach((genre) => {
    //     if (!removeDup.includes(genre)) {
    //       removeDup.push(genre)
    //     }
    //   })
    // })
    let removeDup = Array.from(new Set(temp.flat()));
    setGenres([...removeDup])

  }, [favorites])

  const handleGenre = (e) => {
    let selectedGenre = e.target.value.trim(); // Trim whitespace
    filteredArray = selectedGenre == "All Genres" 
        ? favorites
        : favorites.filter((movie) => {
            //return genreIds[movie.genre_ids[0]].trim() === selectedGenre; // Trim whitespace
            // Check if every genre ID in movie.genre_ids matches selectedGenre
            return movie.genre_ids.some((genre) => genreIds[genre].trim() === selectedGenre); // Trim whitespace
        });
    setFilteredArray(filteredArray)
  }

  return (
    <div className='flex justify-center w-full bg-gray-300'>
      <div className='w-[120vh] bg-slate-50 mt-3'>
        <div className='h-[15vh] p-4 border-b-4 mb-3'>
          <p className='text-3xl'>Your Watchlist</p>
          <div className='flex space-x-2 p-2'>
            <select onChange={handleGenre} className='bg-gray-300 p-1 rounded-l border w-[17vh]'>
              <option value="All Genres">All Genres</option>
              {
                genres.map((genre) => {
                  //return <div key={idx}>{genre}</div>
                  //console.log(genre)
                  return <option key={genre} value={genre}>{genre}</option>
                })
              }
            </select>

          </div>
        </div>

        <div>
          {

            filteredArray.map((favMovie) => {
              
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
                    {favMovie.release_date.substring(0, 4) + " | "}
                    {favMovie.genre_ids.map((genre, idx) => idx < favMovie.genre_ids.length - 1 ? genreIds[genre] + " , " : genreIds[genre])}
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