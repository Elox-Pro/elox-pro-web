import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
    username: string;
    isTfaPending: boolean;
    isSignupNotification: boolean;
}

const initialState: AuthState = {
    username: "",
    isTfaPending: false,
    isSignupNotification: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUsername: (state, action: { payload: string }) => {
            state.username = action.payload
        },
        setIsTfaPending: (state, action: { payload: boolean }) => {
            state.isTfaPending = action.payload;
        },
        setIsSignupNotification: (state, action: { payload: boolean }) => {
            state.isSignupNotification = action.payload;
        }
    }
});

const authReducer = authSlice.reducer;
export const { setUsername, setIsTfaPending, setIsSignupNotification } = authSlice.actions;
export default authReducer;