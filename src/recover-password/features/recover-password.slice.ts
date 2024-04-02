import { createSlice } from "@reduxjs/toolkit";

type RecoverPasswordState = {
    resetFormEnabled: boolean;
    resetPasswordSuccess: boolean;
}

const initialState: RecoverPasswordState = {
    resetFormEnabled: false,
    resetPasswordSuccess: false,
}

const recoverPasswordSlice = createSlice({
    name: "recoverPassword",
    initialState,
    reducers: {
        setResetFormEnabled: (state, action: { payload: boolean }) => {
            state.resetFormEnabled = action.payload;
        },
        setResetPasswordSuccess: (state, action: { payload: boolean }) => {
            state.resetPasswordSuccess = action.payload;
        },
    }
});

const recoverPasswordReducer = recoverPasswordSlice.reducer;
export const { setResetFormEnabled, setResetPasswordSuccess } = recoverPasswordSlice.actions;
export default recoverPasswordReducer;