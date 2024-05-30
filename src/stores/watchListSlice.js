import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
    name: "watchlistMovies",
    initialState: JSON.parse(localStorage.getItem('imdb')) || [],
    reducers: {
        addMovieToWatchlist: (state, action) => {
            state.push(action.payload)
            localStorage.setItem('imdb', JSON.stringify(state))
            console.log("add >", state)
        },
        removeMovieFromWatchlist: (state, action) => {
            state = state.filter((movie) => movie.id !== action.payload)
            localStorage.setItem('imdb', JSON.stringify(state))
            console.log("remove> ", state)
            return state
        }
    }
})

export const { addMovieToWatchlist, removeMovieFromWatchlist } = watchlistSlice.actions

export default watchlistSlice.reducer


