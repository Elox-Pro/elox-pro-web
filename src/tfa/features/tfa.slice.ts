import { createSlice } from "@reduxjs/toolkit";

type TfaState = {
    tfaPending: boolean;
    username: string;
}

const initialState: TfaState = {
    tfaPending: false,
    username: "",
}

const tfaSlice = createSlice({
    name: "tfa",
    initialState,
    reducers: {
        setTfaPending: (state, action: { payload: boolean }) => {
            state.tfaPending = action.payload;
        },
        setUsername: (state, action: { payload: string }) => {
            state.username = action.payload
        },
    }
});

const tfaReducer = tfaSlice.reducer;
export const { setUsername, setTfaPending } = tfaSlice.actions;
export default tfaReducer;