import { createSlice } from "@reduxjs/toolkit/react";
import { ActiveUser2 } from "../types/active-user-2.type";
import Cookies from "js-cookie"
import { showGRecaptcha } from "../../common/helpers/show-grecaptcha.helper";

export const getActiveUserFromCookie = (): ActiveUser2 | null => {
    const ACTIVE_USER_KEY = "ZWxveC1wcm8tYWN0aXZlLXVzZXI"
    const activeUser = Cookies.get(ACTIVE_USER_KEY)
    if (!activeUser) return null
    return JSON.parse(atob(activeUser))
}


type AuthState = {
    activeUser: ActiveUser2,
}

const initialState: AuthState = {
    activeUser: {
        username: null,
        role: null,
        isAuthenticated: false
    },
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        createSession: (state, action: { payload: ActiveUser2 }) => {
            // console.log("createSession")
            showGRecaptcha(false)
            state.activeUser = action.payload

        },
        setActiveUser: (state, action: { payload: ActiveUser2 }) => {
            state.activeUser = action.payload
        },
        deleteSession: (state) => {
            // /console.log(1, "handleLogout", state.activeUser)
            state.activeUser = initialState.activeUser
            // console.log(2, "handleLogout", state.activeUser)
            // state.activeUser = action.payload
            // return authSlice.getInitialState()
        },
    },
});

export const authReducer = authSlice.reducer;
export const { createSession, deleteSession, setActiveUser } = authSlice.actions;
export default authReducer;