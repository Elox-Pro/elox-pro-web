import { createSlice } from "@reduxjs/toolkit";
import { CPState } from "../types/cp-state.type";
import { logout } from "../../auth/features/auth.slice";
import { getSidebarState } from "../helpers/get-sidebar-state.helper";
import { setSidebarState } from "../helpers/set-sidebar-state.helper";

const initialState: CPState = {
    sessionExpiryModal: {
        show: false
    },
    sidebarOffcanvas: {
        sidebarOff: false
    },
    sidebar: {
        hidden: getSidebarState()
    }
}

const cpSlice = createSlice({
    name: "cp",
    initialState,
    reducers: {
        setShowSessionExpiryModal: (state, action: { payload: boolean }) => {
            state.sessionExpiryModal.show = action.payload;
        },
        setSidebarOff: (state, action: { payload: boolean }) => {
            state.sidebarOffcanvas.sidebarOff = action.payload;
        },
        toggleSidebar: (state) => {
            const hidden = !state.sidebar.hidden;
            state.sidebar.hidden = hidden;
            setSidebarState(hidden);
        },

    },
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return cpSlice.getInitialState();
        })
    }
});

const cpReducer = cpSlice.reducer;
export const { setShowSessionExpiryModal, setSidebarOff, toggleSidebar } = cpSlice.actions;
export default cpReducer;