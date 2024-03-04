import { createSlice } from "@reduxjs/toolkit";

const key = "dashboad-sidebar-slice"

const readValue = (): boolean => {
    const value = localStorage.getItem(key)
    if (!value) {
        return false;
    }
    return value === "true"
}

type DashboadSidebarState = {
    value: boolean;
}

const initialState: DashboadSidebarState = {
    value: readValue(),
}

const dashboardSidebarSlice = createSlice({
    name: "dashboardSidebar",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            const value = !state.value;
            localStorage.setItem(key, value.toString())
            state.value = value;
        },
    },
});

const dashboardSidebarReducer = dashboardSidebarSlice.reducer;
export const { toggleSidebar } = dashboardSidebarSlice.actions;
export default dashboardSidebarReducer;