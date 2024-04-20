import { createSlice } from "@reduxjs/toolkit";
import { deleteSession } from "../../auth/features/auth.slice";

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
    },
    extraReducers: (builder) => {
        builder.addCase(deleteSession, () => {
            return cpSidebarOffcanvasSlice.getInitialState();
        })
    }
});

const cpSidebarOffcanvasReducer = cpSidebarOffcanvasSlice.reducer;
export const { sidebarOffToggle } = cpSidebarOffcanvasSlice.actions;
export default cpSidebarOffcanvasReducer;