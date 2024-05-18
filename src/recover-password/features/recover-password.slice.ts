import { createSlice } from "@reduxjs/toolkit";

type RecoverPasswordState = {
    resetFormEnabled: boolean;
}

const initialState: RecoverPasswordState = {
    resetFormEnabled: false
}

const recoverPasswordSlice = createSlice({
    name: "recoverPassword",
    initialState,
    reducers: {
        setResetFormEnabled: (state, action: { payload: boolean }) => {
            state.resetFormEnabled = action.payload;
        },
    }
});

const recoverPasswordReducer = recoverPasswordSlice.reducer;
export const { setResetFormEnabled } = recoverPasswordSlice.actions;
export default recoverPasswordReducer;