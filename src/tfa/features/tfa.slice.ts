import { createSlice } from "@reduxjs/toolkit";

type TfaState = {
    tfaPending: boolean;
    tfaUsername: string;
}

const initialState: TfaState = {
    tfaPending: false,
    tfaUsername: "",
}

const tfaSlice = createSlice({
    name: "tfa",
    initialState,
    reducers: {
        setTfaPending: (state, action: { payload: boolean }) => {
            state.tfaPending = action.payload;
        },
        setTfaUsername: (state, action: { payload: string }) => {
            state.tfaUsername = action.payload
        },
    }
});

const tfaReducer = tfaSlice.reducer;
export const { setTfaUsername, setTfaPending } = tfaSlice.actions;
export default tfaReducer;