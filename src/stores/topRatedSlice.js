import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const STATUS = {
    SUCCESS : 'success',
    LOADING : 'loading',
    ERROR : 'error'
}

export const fetchTopRatedMovies = createAsyncThunk('fetchTopRatedMovies', async () => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=731e37b9dcf15c6797f4888e7858a66d`)
    const filteredRes = response.data.results.sort((a, b) => {
        return b.release_date - a.release_date
    })
    return filteredRes
})

const topRatedSlice = createSlice({
    name : 'topRatedMovies',
    initialState : {
        data : [],
        status : STATUS.SUCCESS,
        topRatedMovies : [],
        activeIndex : 0
    },
    reducers : {
        setTopRatedMovies(state, action)
        {
            state.topRatedMovies = action.payload
        },
        setActiveIndex(state, action)
        {
            const { items, nextSlice, activeIndex } = action.payload
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
        builder.addCase(fetchTopRatedMovies.pending, (state) => {
            state.data = STATUS.LOADING
        }).addCase(fetchTopRatedMovies.fulfilled, (state, action) =>{
            state.topRatedMovies = action.payload
            state.status = STATUS.SUCCESS
        }).addCase(fetchTopRatedMovies.rejected, (state) => {
            state.status = STATUS.ERROR
        })
    }
})

export const { extraReducers, setTopRatedMovies, setActiveIndex } = topRatedSlice.actions

export default topRatedSlice.reducer