import { createSlice } from "@reduxjs/toolkit/react";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
    },
    reducers: {
        handleLogout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            console.log('logout user');
        },
    },
});

export const authReducer = authSlice.reducer;
export const { handleLogout } = authSlice.actions;
export default authReducer;