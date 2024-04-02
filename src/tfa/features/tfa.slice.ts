import { createSlice } from "@reduxjs/toolkit";

type TfaState = {
    isTfaPending: boolean;
    username: string;
}

const initialState: TfaState = {
    isTfaPending: false,
    username: "",
}

const tfaSlice = createSlice({
    name: "tfa",
    initialState,
    reducers: {
        setIsTfaPending: (state, action: { payload: boolean }) => {
            state.isTfaPending = action.payload;
        },
        setUsername: (state, action: { payload: string }) => {
            state.username = action.payload
        },
    }
});

const tfaReducer = tfaSlice.reducer;
export const { setUsername, setIsTfaPending } = tfaSlice.actions;
export default tfaReducer;