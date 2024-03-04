import { createSlice } from "@reduxjs/toolkit";

const key = "dashboad-sidebar-slice"

const isHidden = (): boolean => {
    const hidden = localStorage.getItem(key)
    if (!hidden) {
        return false;
    }
    return hidden === "true"
}

type DashboadSidebarState = {
    hidden: boolean;
}

const initialState: DashboadSidebarState = {
    hidden: isHidden(),
}

const dashboardSidebarSlice = createSlice({
    name: "dashboardSidebar",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            const hidden = !state.hidden;
            localStorage.setItem(key, hidden.toString())
            state.hidden = hidden;
        },
    },
});

const dashboardSidebarReducer = dashboardSidebarSlice.reducer;
export const { toggleSidebar } = dashboardSidebarSlice.actions;
export default dashboardSidebarReducer;