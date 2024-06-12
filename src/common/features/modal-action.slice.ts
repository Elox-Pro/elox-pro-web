import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { logout } from "../../auth/features/auth.slice";
import { ModalAction } from "../types/modal-action.state.type";

const initialState: ModalAction = {
    backToTop: false,
}

const slice = createSlice({
    name: "modalAction",
    initialState,
    reducers: {
        setModalActionBackToTop(state, action: PayloadAction<boolean>) {
            state.backToTop = action.payload;
        }
    }, extraReducers(builder) {
        builder.addCase(logout, () => {
            return slice.getInitialState();
        });
    },
});

const modalActionReducer = slice.reducer;

export const {
    setModalActionBackToTop
} = slice.actions;

export default modalActionReducer;