import { createSlice } from "@reduxjs/toolkit/react";
import { ErrorState } from "../types/error-state.type";

const name = "error";
const initialState: ErrorState = {
    message: null,
    code: 0
};

const errorSlice = createSlice({
    name,
    initialState,
    reducers: {
        setError: (state, action: { payload: ErrorState }) => {
            state.message = action.payload.message;
            state.code = action.payload.code;
        },
        clearError: (state) => {
            state.message = null;
            state.code = 0;
        }
    }
});

const errorReducer = errorSlice.reducer;
export const { setError, clearError } = errorSlice.actions;
export default errorReducer;