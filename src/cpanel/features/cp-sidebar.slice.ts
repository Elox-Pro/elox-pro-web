import { createSlice } from "@reduxjs/toolkit";

const key = "cp-sidebar-slice"

const isHidden = (): boolean => {
    const hidden = localStorage.getItem(key)
    if (!hidden) {
        return false;
    }
    return hidden === "true"
}

type cpSidebarState = {
    hidden: boolean;
}

const initialState: cpSidebarState = {
    hidden: isHidden(),
}

const cpSidebarSlice = createSlice({
    name: "cpSidebar",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            const hidden = !state.hidden;
            localStorage.setItem(key, hidden.toString())
            state.hidden = hidden;
        },
    },
});

const cpSidebarReducer = cpSidebarSlice.reducer;
export const { toggleSidebar } = cpSidebarSlice.actions;
export default cpSidebarReducer;