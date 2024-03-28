import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
    username: string;
    isSignupNotification: boolean;
}

const initialState: AuthState = {
    username: "",
    isSignupNotification: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUsername: (state, action: { payload: string }) => {
            state.username = action.payload
        },
        setIsSignupNotification: (state, action: { payload: boolean }) => {
            state.isSignupNotification = action.payload;
        }
    }
});

const authReducer = authSlice.reducer;
export const { setUsername, setIsSignupNotification } = authSlice.actions;
export default authReducer;