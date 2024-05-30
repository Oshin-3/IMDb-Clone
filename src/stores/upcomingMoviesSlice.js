import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const STATUS = {
    SUCCESS : 'success',
    LOADING : 'loading',
    ERROR : 'error'
}

export const fetchUpcomingMovies = createAsyncThunk('fetchUpcomingMovies', async () => {
    const currentDate = new Date();
        let page = 1;
        let upcomingMovies = [];
        let moviesCount = 0;

        while (upcomingMovies.length < 20) {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=731e37b9dcf15c6797f4888e7858a66d&page=${page}`)
                let movies = response.data.results.filter(movie => new Date(movie.release_date) > currentDate);

                movies.sort((a, b) => {
                    return b.popularity - a.popularity;
                });

                if (movies.length === 0) {
                    break;
                }

                // Determine how many more movies can be added without exceeding 10
                const remainingMoviesCount = 20 - upcomingMovies.length;
                upcomingMovies = upcomingMovies.concat(movies.slice(0, remainingMoviesCount));
                moviesCount += movies.length;
                page++;
            } catch (error) {
                console.error('Error fetching upcoming movies:', error);
                break; // Break the loop if an error occurs
            }
        }
    return upcomingMovies
})

const upcomingMoviesSlice = createSlice({
    name : 'upcomingMovies',
    initialState : {
        data : [],
        status : STATUS.SUCCESS,
        upcomingMovies : [],
        activeIndex : 0
    },
    reducers : {
        setUpcomingMovies(state, action)
        {
            state.upcomingMovies = action.payload
        },
        setActiveIndex(state, action)
        {
            const { items, nextSlice, activeIndex } = action.payload
            console.log(activeIndex)
            if (nextSlice == true)
            {
                state.activeIndex =  activeIndex === items.length - 1 ? 0 : activeIndex + 1
            }
            else
            {
                state.activeIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1
            }
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchUpcomingMovies.pending, (state) => {
            state.data = STATUS.LOADING
        }).addCase(fetchUpcomingMovies.fulfilled, (state, action) =>{
            state.upcomingMovies = action.payload
            state.status = STATUS.SUCCESS
        }).addCase(fetchUpcomingMovies.rejected, (state) => {
            state.status = STATUS.ERROR
        })
    }
})

export const { extraReducers, setUpcomingMovies, setActiveIndex } = upcomingMoviesSlice.actions

export default upcomingMoviesSlice.reducer