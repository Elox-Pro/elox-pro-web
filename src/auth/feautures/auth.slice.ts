import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
    isSignupNotification: boolean;
}

const initialState: AuthState = {
    isSignupNotification: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsSignupNotification: (state, action: { payload: boolean }) => {
            state.isSignupNotification = action.payload;
        }
    }
});

const authReducer = authSlice.reducer;
export const { setIsSignupNotification } = authSlice.actions;
export default authReducer;