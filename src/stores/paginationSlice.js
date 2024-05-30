import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
    name : 'pagination',
    initialState : {
        pages : [],
        activePage : 1
    },
    reducers : {
        setPages(state, action)
        {
            state.pages = action.payload
        },
        setActivePage(state, action)
        {
            state.activePage = action.payload
        }
    }
})

export const { setPages, setActivePage } = paginationSlice.actions

export default paginationSlice.reducer