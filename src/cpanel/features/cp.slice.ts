import { createSlice } from "@reduxjs/toolkit";
import { CPState } from "../types/cp-state.type";
import { logout } from "../../auth/features/auth.slice";

const initialState: CPState = {
    sessionExpiryModal: {
        show: false
    }
}

const cpSlice = createSlice({
    name: "cp",
    initialState,
    reducers: {
        setShowSessionExpiryModal: (state, action: { payload: boolean }) => {
            state.sessionExpiryModal.show = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return cpSlice.getInitialState();
        })
    }
});

const cpReducer = cpSlice.reducer;
export const { setShowSessionExpiryModal } = cpSlice.actions;
export default cpReducer;