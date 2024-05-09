import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../../auth/features/auth.slice";

type CPSidebarOffcanvasState = {
    sidebarOff: boolean;
}

const initialState: CPSidebarOffcanvasState = {
    sidebarOff: false,
}

const cpSidebarOffcanvasSlice = createSlice({
    name: "cpSidebarOffcanvas",
    initialState,
    reducers: {
        setSidebarOff: (state, action: { payload: boolean }) => {
            state.sidebarOff = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return cpSidebarOffcanvasSlice.getInitialState();
        })
    }
});

const cpSidebarOffcanvasReducer = cpSidebarOffcanvasSlice.reducer;
export const { setSidebarOff } = cpSidebarOffcanvasSlice.actions;
export default cpSidebarOffcanvasReducer;