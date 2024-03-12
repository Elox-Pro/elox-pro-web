import { createSlice } from "@reduxjs/toolkit";

type LoginState = {
    username: string;
    isTfaPending: boolean;
}

const initialState: LoginState = {
    username: "",
    isTfaPending: false,
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setUsername: (state, action: { payload: string }) => {
            state.username = action.payload
        },
        setIsTfaPending: (state, action: { payload: boolean }) => {
            state.isTfaPending = action.payload;
        },
    }
});

const loginReducer = loginSlice.reducer;
export const { setUsername, setIsTfaPending } = loginSlice.actions;
export default loginReducer;