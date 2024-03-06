import { createSlice } from "@reduxjs/toolkit";

type DashboardSidebarOffcanvasState = {
    show: boolean;
}

const initialState: DashboardSidebarOffcanvasState = {
    show: false,
}

const dashboardSidebarOffcanvasSlice = createSlice({
    name: "dashboardSidebarOffcanvas",
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

const dashboardSidebarOffcanvasReducer = dashboardSidebarOffcanvasSlice.reducer;
export const { handleShow, handleClose } = dashboardSidebarOffcanvasSlice.actions;
export default dashboardSidebarOffcanvasReducer;