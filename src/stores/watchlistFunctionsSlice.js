import { createSlice } from "@reduxjs/toolkit";

const watchListFunctionSlice = createSlice({
    name: 'watchlistFunctions',
    initialState: {
        filteredGenre: [],
        filteredMovies: JSON.parse(localStorage.getItem('imdb')) || [],
        sortCriteria: "List Order",
        sortOrder: "asc",
        editFlag: "0",
        isChecked: false,
        selectAllFlg: false,
        selectedMovieCount: 0,
        movieIds: []
    },
    reducers: {
        setFilteredGenre(state, action) {
            const removeDup = Array.from(new Set(action.payload.flat()))
            state.filteredGenre = [...removeDup]
        },
        setFilteredMovies(state, action) {
            const { movies, selectedGenres, GENRES } = action.payload
            const filteredArray = selectedGenres == "All Genres"
                ? movies
                : movies.filter((movie) => {
                    return movie.genre_ids.some((genre) => GENRES[genre].trim() === selectedGenres); // Trim whitespace
                })
            state.filteredMovies = [...filteredArray]
        },
        setSortCriteria(state, action) {
            state.sortCriteria = action.payload
        },
        sortOrder(state, action) {
            state.sortOrder = action.payload
        },
        setSorting(state, action) {
            let { movies, sortCriteria, sortOrder } = action.payload
            let sortedMovies
            switch (sortCriteria) {
                case "List Order":
                    sortedMovies = sortOrder == "asc" ? [...movies].reverse() : [...movies].reverse().reverse();
                    break;
                case "Rating":
                    sortedMovies = [...movies].sort((objA, objB) => {
                        if (sortOrder === "asc")
                            return objA.vote_average - objB.vote_average
                        else
                            return objB.vote_average - objA.vote_average
                    });
                    break;
                case "Release Year":
                    sortedMovies = [...movies].sort((objA, objB) => {
                        if (sortOrder === "asc")
                            return objA.release_date.substring(0, 4) - objB.release_date.substring(0, 4)
                        else
                            return objB.release_date.substring(0, 4) - objA.release_date.substring(0, 4)
                    });
                    break;
                case "Popularity":
                    sortedMovies = [...movies].sort((objA, objB) => {
                        if (sortOrder === "asc")
                            return objA.popularity - objB.popularity
                        else
                            return objB.popularity - objA.popularity
                    });
                    break;
                default:
                    sortedMovies = movies;
            }

            state.sortOrder = sortOrder
            state.filteredMovies = [...sortedMovies];
        },
        setEditFlag(state, action) {
            state.editFlag = action.payload
        },
        setIsChecked(state, action) {
            state.isChecked = action.payload
        },
        setselectAllFlg(state, action) {
            state.selectAllFlg = action.payload
        },
        setSelectedMovieCount(state, action) {
            state.selectedMovieCount = action.payload
        },
        setMovieIds(state, action) {
            const { selectedMovieCount, movie_id, isChecked } = action.payload
            console.log(selectedMovieCount)
            let movieList = [...state.movieIds]
            state.selectedMovieCount = selectedMovieCount
            if (isChecked === true) {
                movieList.push(movie_id)
                state.movieIds = [...movieList]
            }
            else {
                const index = movieList.indexOf(movie_id);
                if (index > -1) {
                    movieList.splice(index, 1);
                }
                state.movieIds = [...movieList]
            }
        },
        removeMovies(state, action) {
            const { isChecked, filteredArray, movieIds } = action.payload
            console.log(filteredArray)
            if (isChecked == true) {
                state.filteredMovies = []
                localStorage.setItem('imdb', JSON.stringify([]))
            }
            if (movieIds.length > 0) {
                const moviesAfterDelete = filteredArray.filter((movie) => !movieIds.includes(movie.id))
                state.filteredMovies = [...moviesAfterDelete]
                localStorage.setItem('imdb', JSON.stringify(moviesAfterDelete))
            }
        }
    }
})

export const { setFilteredGenre, setFilteredMovies, setSortCriteria, sortOrder, setSorting, setEditFlag, setIsChecked, setselectAllFlg, setSelectedMovieCount, setMovieIds, removeMovies } = watchListFunctionSlice.actions

export default watchListFunctionSlice.reducer