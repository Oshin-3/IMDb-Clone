import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const STATUS = {
    SUCCESS : 'success',
    LOADING : 'loading',
    ERROR : 'error'
}

export const fetchCorouselData = createAsyncThunk('fetchCorouselData', async () => {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=731e37b9dcf15c6797f4888e7858a66d`)
    return res.data
})

const carouselSlice = createSlice({
    name : 'carousel',
    initialState : {
        data : [],
        status : STATUS.SUCCESS,
        activeIndex : 0
    },
    reducers : {
        setActiveIndex(state, action)
        {
            const { topPicksMovies, nextSlice, activeIndex } = action.payload
            if (nextSlice == true)
            {
                state.activeIndex =  activeIndex === topPicksMovies.length - 1 ? 0 : activeIndex + 1
            }
            else
            {
                state.activeIndex = activeIndex === 0 ? topPicksMovies.length - 1 : activeIndex - 1
            }
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchCorouselData.pending, (state) => {
            state.status = STATUS.LOADING
        }).addCase(fetchCorouselData.fulfilled, (state, action) => {
            state.data = action.payload.results
            state.status = STATUS.SUCCESS
        }).addCase(fetchCorouselData.rejected, (state) => {
            state.status = STATUS.ERROR
        })
    }
})

export const { extraReducers, setActiveIndex } = carouselSlice.actions

export default carouselSlice.reducer