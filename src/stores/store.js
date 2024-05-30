import { configureStore } from "@reduxjs/toolkit";
import watchListReducers from "./watchListSlice";
import moviesReducers from "./moviesSlice";
import paginationReducers from "./paginationSlice";
import watchlistFunctionsReducer from "./watchlistFunctionsSlice";
import carouselReducer from "./carouselSlice";
import upcomingMoviesReducer from "./upcomingMoviesSlice";
import topRatedReducer from "./topRatedSlice";
import topActorReducer from "./topActorSlice";

const store = configureStore({
    reducer : {
        watchlistMovies : watchListReducers,
        movies : moviesReducers,
        pagination : paginationReducers,
        watchlistFunctions : watchlistFunctionsReducer,
        carousel : carouselReducer,
        upcomingMovies : upcomingMoviesReducer,
        topRatedMovies : topRatedReducer,
        topActors : topActorReducer
    }
})

export default store