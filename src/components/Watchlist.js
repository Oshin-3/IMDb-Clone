import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faStar, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Movies from './Movies';

function Watchlist() {

  const [favorites, setFavorites] = useState([])
  const [genres, setGenres] = useState([])
  let [filteredArray, setFilteredArray] = useState([])
  let [sortCriteria, setSortCriteria] = useState("List Order")
  let [sortOrder, setSortOrder] = useState(1)
  let [selectedMovieCount, setSelectedMovieCount] = useState(0)
  let [editFlag, setEditFlag] = useState(0)
  let [movieIds, setMovieIds] = useState([])

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


    // temp.flat() flattens the nested array temp into a single array.
    // new Set() creates a Set object, which automatically removes duplicate values.
    // Array.from() converts the Set back into an array.
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

  //sorting logic 

  const sortAscending = () => {
    setSortOrder(1)
    switch (sortCriteria) {
      case "List Order": return filteredArray = filteredArray.reverse()
      case "Rating": return filteredArray = filteredArray.sort((objA, objB) => {
        return objA.vote_average - objB.vote_average
      })
      case "Release Year": return filteredArray = filteredArray.sort((objA, objB) => {
        return objA.release_date.substring(0, 4) - objB.release_date.substring(0, 4)
      })
      case "Popularity": return filteredArray = filteredArray.sort((objA, objB) => {
        return objA.popularity - objB.popularity
      })
    }
    setFilteredArray(filteredArray)
  }

  const sortDecending = () => {
    setSortOrder(-1)
    switch (sortCriteria) {
      case "List Order": return filteredArray = filteredArray.reverse()
      case "Rating": return filteredArray = filteredArray.sort((objA, objB) => {
        return objB.vote_average - objA.vote_average
      })
      case "Release Year": return filteredArray = filteredArray.sort((objA, objB) => {
        return objB.release_date.substring(0, 4) - objA.release_date.substring(0, 4)
      })
      case "Popularity": return filteredArray = filteredArray.sort((objA, objB) => {
        return objB.popularity - objA.popularity
      })
    }
    setFilteredArray(filteredArray)
  }

  //handle movie selection
  const handleCheckbox = (e) => {
    const movie_id = Number(e.target.dataset.id)
    //console.log(e.target.checked)
    let movieList = [...movieIds]
    if (e.target.checked == true) {
      setSelectedMovieCount(selectedMovieCount + 1)
      movieList.push(movie_id)
      setMovieIds(movieList)
    }
    else {
      setSelectedMovieCount(selectedMovieCount - 1)
      const index = movieList.indexOf(movie_id);
      if (index > -1) {
        movieList.splice(index, 1);
      }
      setMovieIds(movieList)
    }

  }
  //console.log(movieIds)

  //remove movie from watchlist
  const removeFromWatchlist = () => {
    if (movieIds.length > 0) {
      const moviesAfterDelete = favorites.filter((movie) => !movieIds.includes(movie.id))
      console.log(moviesAfterDelete)
      setFilteredArray(moviesAfterDelete)
      setFavorites(moviesAfterDelete)
      localStorage.setItem('imdb', JSON.stringify(moviesAfterDelete))
      setEditFlag(0)
      setSelectedMovieCount(0)
      window.location.reload()
    }
  }

  return (
    <div className='flex justify-center w-full bg-gray-300'>
      <div className='w-[120vh] bg-slate-50 mt-3'>
        <div className='h-[15vh] p-4 border-b-4 '>
          <div className='float-root bg-blue-600 items-center'>
            <p className='text-3xl float-left'>Your Watchlist</p>
            {
              editFlag == 0 ? (<div className='pl-10 text-xl float-right mr-3 text-gray-400' onClick={() => setEditFlag(1)}>
                <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                <span>EDIT</span>
              </div>) : ""
            }
          </div>
         
          <div className='flex space-x-2 p-2 w-full flow-root'>
            <select onChange={handleGenre} className='bg-gray-300 p-1 rounded-l border w-[17vh]'>
              <option value="All Genres">All Genres</option>
              {
                genres.map((genre) => {
                  return <option key={genre} value={genre}>{genre}</option>
                })
              }
            </select>

            <div className=' float-right space-x-1'>
              <label>Sort By: </label>
              <select className='bg-gray-300 p-1 rounded-l border ' onChange={(e) => setSortCriteria(e.target.value)}>
                <option value="List Order">List Order</option>
                <option value="Popularity">Popularity</option>
                <option value="Rating">Rating</option>
                <option value="Release Year">Release Year</option>
              </select>
              {
                sortOrder == 1 ? (
                  <><FontAwesomeIcon className='pr-2 text-gray-300 pointer-events-none' icon={faChevronDown} /><FontAwesomeIcon onClick={sortDecending} icon={faChevronUp} /></>) :
                  (<><FontAwesomeIcon onClick={sortAscending} className='pr-2' icon={faChevronDown} /><FontAwesomeIcon className='text-gray-300' icon={faChevronUp} /></>)
              }

            </div>
          </div>
        </div>
        {
          //console.log(editFlag)
          editFlag == 1 ? (<div className=' p-2 pl-6 bg-gray-200 h-[8vh] border-b-4'>
            <input className="mr-4 w-4 h-4" type='checkbox' /><span className='pr-4'> {selectedMovieCount} selected</span>
            <button onClick={removeFromWatchlist} className='text-center text-xs text-white bg-sky-600 p-2 rounded-xl '>DELETE</button>
          </div>) : ""
        }

        <div>
          {

            filteredArray.map((favMovie) => {

              return <div key={favMovie.id} className='flex h-[35vh] border-b-2 p-4 mb-3 mr-3'>
                {editFlag == 1 ? (<div className='flex items-center pl-2'>
                  <input onChange={handleCheckbox} className='w-4 h-4 mr-4' data-id={favMovie.id} type='checkbox' />
                </div>) : ""}

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
                    {favMovie.genre_ids.map((genre, idx) => idx < favMovie.genre_ids.length - 1 ? genreIds[genre] + ", " : genreIds[genre])}
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