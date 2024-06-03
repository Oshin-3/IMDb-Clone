import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faStar, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setFilteredGenre, setFilteredMovies, setSortCriteria, sortOrder, setSorting, setEditFlag, setIsChecked, setselectAllFlg, setSelectedMovieCount, setMovieIds, removeMovies } from '../stores/watchlistFunctionsSlice';

function Watchlist() {

  let favorites = useSelector((state) => state.watchlistMovies)
  const { filteredGenre: genres, filteredMovies: filteredArray, sortOrder: sortOrder, sortCriteria: sortCriteria, editFlag: editFlag, isChecked: isChecked, selectAllFlg: selectAllFlg, selectedMovieCount: selectedMovieCount, movieIds: movieIds } = useSelector((state) => state.watchlistFunctions)

  const dispatch = useDispatch()

  let GENRES = {
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
    dispatch(setFilteredMovies({ movies: favorites, GENRES: GENRES, selectedGenres: "All Genres" }))
  }, [])

  useEffect(() => {
    let temp = favorites.map((movie) => {
      return movie.genre_ids.map((genre) => GENRES[genre] + " ")
    })

    dispatch(setFilteredGenre(temp))

  }, [favorites, dispatch])

  const handleGenre = (e) => {
    let selectedGenre = e.target.value.trim(); // Trim whitespace
    dispatch(setFilteredMovies({ movies: favorites, GENRES: GENRES, selectedGenres: selectedGenre }))
  }

  //sorting logic 

  const selectSortCriteria = (e) => {
    const criteria = e.target.value
    dispatch(setSortCriteria(criteria))
    dispatch(setSorting({ movies: filteredArray, sortCriteria: sortCriteria, sortOrder: sortOrder }))
  }

  const sortAscending = () => {
    dispatch(setSorting({ movies: filteredArray, sortCriteria: sortCriteria, sortOrder: "asc" }))
  }

  const sortDecending = () => {
    dispatch(setSorting({ movies: filteredArray, sortCriteria: sortCriteria, sortOrder: "desc" }))
  }

  //handle movie selection
  const handleCheckbox = (e) => {
    const movie_id = Number(e.target.dataset.id)

    if (e.target.checked == true) {
      dispatch(setMovieIds({ selectedMovieCount: selectedMovieCount + 1, movie_id: movie_id, isChecked: true }))
    }
    else {
      dispatch(setMovieIds({ selectedMovieCount: selectedMovieCount - 1, movie_id: movie_id, isChecked: false }))
    }

  }

  //remove movie from watchlist
  const removeFromWatchlist = () => {

    dispatch(removeMovies({ isChecked: isChecked, filteredArray: favorites, movieIds: movieIds }))
    dispatch(setEditFlag("0"))
    dispatch(setSelectedMovieCount(0))
    dispatch(setselectAllFlg(false))
    window.location.reload()
  }

  const handleSelectAll = (e) => {

    if (e.target.checked == true) {
      dispatch(setIsChecked(true))
      dispatch(setselectAllFlg(true))
      dispatch(setSelectedMovieCount(filteredArray.length))
    }
    else {
      dispatch(setIsChecked(false))
      dispatch(setselectAllFlg(false))
      dispatch(setSelectedMovieCount(0))
    }
  }

  return (
    <div className='flex justify-center w-full bg-gray-300 relative top-14'>
      <div className='w-[120vh] bg-slate-50 mt-3'>
        <div className='h-[15vh] p-4 border-b-4 '>
          <div className='float-root bg-blue-600 items-center'>
            <p className='text-3xl float-left'>Your Watchlist</p>
            {
              editFlag == "0" ? (<div className='pl-10 text-xl float-right mr-3 text-gray-400' onClick={() => dispatch(setEditFlag("1"))}>
                <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                <span>EDIT</span>
              </div>) : (<div className='pl-10 text-xl float-right mr-3 text-gray-400' onClick={() => dispatch(setEditFlag("0"))}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></div>)
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
              {/* <select className='bg-gray-300 p-1 rounded-l border ' onChange={(e) => setSortCriteria(e.target.value)}> */}
              <select className='bg-gray-300 p-1 rounded-l border ' onChange={selectSortCriteria}>
                <option value="List Order">List Order</option>
                <option value="Popularity">Popularity</option>
                <option value="Rating">Rating</option>
                <option value="Release Year">Release Year</option>
              </select>
              {
                sortOrder == "asc" ? (
                  <><FontAwesomeIcon className='pr-2 text-gray-300 pointer-events-none' icon={faChevronDown} /><FontAwesomeIcon onClick={sortDecending} icon={faChevronUp} /></>) :
                  (<><FontAwesomeIcon onClick={sortAscending} className='pr-2' icon={faChevronDown} /><FontAwesomeIcon className='text-gray-300' icon={faChevronUp} /></>)
              }

            </div>
          </div>
        </div>
        {
          //console.log(editFlag)
          editFlag == "1" ? (<div className=' p-2 pl-6 bg-gray-200 h-[8vh] border-b-4'>
            <input onChange={handleSelectAll} className="mr-4 w-4 h-4" type='checkbox' /><span className='pr-4'> {selectedMovieCount} selected</span>
            <button onClick={removeFromWatchlist} className='text-center text-xs text-white bg-sky-600 p-2 rounded-xl '>DELETE</button>
          </div>) : ""
        }

        <div>
          {
            filteredArray.length == 0 ? (<div className='p-4'>No Movies</div>) : ""
          }
          {

            filteredArray.map((favMovie) => {

              return <div key={favMovie.id} className='flex h-[35vh] border-b-2 p-4 mb-3 mr-3'>

                {

                  editFlag == "1" ? (<div className='flex items-center pl-2'>

                    {selectAllFlg == true ? (<input checked={isChecked} onChange={handleCheckbox} className='w-4 h-4 mr-4' data-id={favMovie.id} type='checkbox' />) :
                      (<input onChange={handleCheckbox} className='w-4 h-4 mr-4' data-id={favMovie.id} type='checkbox' />)}
                  </div>) : <></>

                }

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
                    {favMovie.genre_ids.map((genre, idx) => idx < favMovie.genre_ids.length - 1 ? GENRES[genre] + ", " : GENRES[genre])}
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