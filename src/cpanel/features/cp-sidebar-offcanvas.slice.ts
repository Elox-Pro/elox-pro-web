import { createSlice } from "@reduxjs/toolkit";

type CPSidebarOffcanvasState = {
    show: boolean;
}

const initialState: CPSidebarOffcanvasState = {
    show: false,
}

const cpSidebarOffcanvasSlice = createSlice({
    name: "cpSidebarOffcanvas",
    initialState,
    reducers: {
        handleShow: (state) => {
            state.show = true;
        },
        handleClose: (state) => {
            state.show = false;
        },
    },
});

const cpSidebarOffcanvasReducer = cpSidebarOffcanvasSlice.reducer;
export const { handleShow, handleClose } = cpSidebarOffcanvasSlice.actions;
export default cpSidebarOffcanvasReducer;