import { createSlice } from "@reduxjs/toolkit";

type RecoverPasswordState = {
    isResetFormEnabled: boolean;
}

const initialState: RecoverPasswordState = {
    isResetFormEnabled: false,
}

const recoverPasswordSlice = createSlice({
    name: "recoverPassword",
    initialState,
    reducers: {
        setIsResetFormEnabled: (state, action: { payload: boolean }) => {
            state.isResetFormEnabled = action.payload;
        }
    }
});

const recoverPasswordReducer = recoverPasswordSlice.reducer;
export const { setIsResetFormEnabled } = recoverPasswordSlice.actions;
export default recoverPasswordReducer;