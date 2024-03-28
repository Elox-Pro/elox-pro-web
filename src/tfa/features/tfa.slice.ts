import { createSlice } from "@reduxjs/toolkit";

type TfaState = {
    isTfaPending: boolean;
}

const initialState: TfaState = {
    isTfaPending: false
}

const tfaSlice = createSlice({
    name: "tfa",
    initialState,
    reducers: {
        setIsTfaPending: (state, action: { payload: boolean }) => {
            state.isTfaPending = action.payload;
        },
    }
});

const tfaReducer = tfaSlice.reducer;
export const { setIsTfaPending } = tfaSlice.actions;
export default tfaReducer;