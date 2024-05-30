import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const STATUS = {
    SUCCESS : 'success',
    LOADING : 'loading',
    ERROR : 'error'
}

export const fetchTopActors = createAsyncThunk('fetchTopActors', async() => {
    let page = 1;
    let topActor = [];
    let actorCount = 0;

    while (topActor.length < 20) {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/trending/person/day?api_key=731e37b9dcf15c6797f4888e7858a66d&page=${page}`);
            let actors = response.data.results.filter(actor => actor.known_for_department == "Acting");

            actors.sort((a, b) => {
                return b.popularity - a.popularity;
            });

            if (actors.length === 0) {
                break;
            }

            // Determine how many more movies can be added without exceeding 10
            const remainingActorsCount = 20 - topActor.length;
            topActor = topActor.concat(actors.slice(0, remainingActorsCount));
            actorCount += actorCount.length;
            page++;

        } catch (error) {
            console.error('Error fetching top actors movies:', error);
            break; // Break the loop if an error occurs
        }
    }
    console.log("topactor slice> ", topActor)
    return topActor
})

const topActorSlice = createSlice({
    name : 'topActor',
    initialState : {
        data : [],
        status : STATUS.SUCCESS,
        topActors : [],
        activeIndex : 0
    },
    reducers : {
        setTopActors(state, action)
        {
            state.topActors = action.payload
        },
        setActiveIndex(state, action)
        {
            const { items, nextSlide, activeIndex } = action.payload;
            if (nextSlide) {
                state.activeIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
            } else {
                state.activeIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
            }
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchTopActors.pending, (state) => {
            state.status = STATUS.LOADING
        }).addCase(fetchTopActors.fulfilled, (state, action) => {
            state.topActors = action.payload
            state.status = STATUS.SUCCESS
        }).addCase(fetchTopActors.rejected, (state) => {
            state.status = STATUS.ERROR
        })
    }

})

export const { extraReducers, setTopActors, setActiveIndex } = topActorSlice.actions

export default topActorSlice.reducer