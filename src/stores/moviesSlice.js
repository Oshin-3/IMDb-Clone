import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const STATUS = {
    SUCCESS : 'success',
    LOADING : 'loading',
    ERROR : 'error'
}

export const fetchMovieData = createAsyncThunk('movies/fetchMovieData', async (pageNum) => {
    const res = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=731e37b9dcf15c6797f4888e7858a66d&page=${pageNum}`);
    return res.data;
})

const moviesSlice = createSlice({
    name : 'movies',
    initialState : {
        data : [],
        status : STATUS.SUCCESS
    },
    extraReducers : (builder) => {
        builder.addCase(fetchMovieData.pending, (state) => {
            state.status = STATUS.LOADING
        }).addCase(fetchMovieData.fulfilled, (state, action) => {
            state.data = action.payload.results
            state.status = STATUS.SUCCESS
        }).addCase(fetchMovieData.rejected, (state) => {
            state.status = STATUS.ERROR
        })
    }
})

export const { extraReducers } = moviesSlice.actions
export default moviesSlice.reducer

// export function fetchMovieData(pageNum) {
//     return async function fetchProductsThunk(dispatch) {
//         dispatch(setStatus(STATUS.LOADING))
//         try {
//             const res = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=731e37b9dcf15c6797f4888e7858a66d&page=${pageNum}`)
//             dispatch(setProducts(res.data))
//             dispatch(setStatus(STATUS.SUCCESS))
//         }
//         catch (error) {
//             console.log(error)
//             dispatch(setStatus(STATUS.ERROR))
//         }
//     }
// }
