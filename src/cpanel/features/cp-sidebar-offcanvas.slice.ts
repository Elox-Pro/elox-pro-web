import { createSlice } from "@reduxjs/toolkit";

type CPSidebarOffcanvasState = {
    sidebarOffShow: boolean;
}

const initialState: CPSidebarOffcanvasState = {
    sidebarOffShow: false,
}

const cpSidebarOffcanvasSlice = createSlice({
    name: "cpSidebarOffcanvas",
    initialState,
    reducers: {
        sidebarOffToggle: (state) => {
            state.sidebarOffShow = !state.sidebarOffShow;
        },
        sidebarOffClose: (state) => {
            state.sidebarOffShow = false;
        },
    },
});

const cpSidebarOffcanvasReducer = cpSidebarOffcanvasSlice.reducer;
export const { sidebarOffToggle, sidebarOffClose } = cpSidebarOffcanvasSlice.actions;
export default cpSidebarOffcanvasReducer;