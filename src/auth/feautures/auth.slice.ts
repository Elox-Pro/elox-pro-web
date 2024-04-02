import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
    signupSuccess: boolean;
}

const initialState: AuthState = {
    signupSuccess: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSignupSuccess: (state, action: { payload: boolean }) => {
            state.signupSuccess = action.payload;
        }
    }
});

const authReducer = authSlice.reducer;
export const { setSignupSuccess } = authSlice.actions;
export default authReducer;