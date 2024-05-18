import { createSlice } from "@reduxjs/toolkit/react";
import { ActiveUser } from "../types/active-user.type";
import { showGRecaptcha } from "../../common/helpers/show-grecaptcha.helper";

type AuthState = {
    activeUser: ActiveUser,
}

const initialState: AuthState = {
    activeUser: {
        username: null,
        role: null,
        isAuthenticated: false,
        exp: 0,
        avatarUrl: null,
    },
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: { payload: ActiveUser }) => {
            showGRecaptcha(false)
            state.activeUser = action.payload
        },
        logout: (state) => {
            state.activeUser = initialState.activeUser
        },
        setActiveUser: (state, action: { payload: ActiveUser }) => {
            state.activeUser = action.payload
        },
    },
});

export const authReducer = authSlice.reducer;
export const { login, logout, setActiveUser } = authSlice.actions;
export default authReducer;