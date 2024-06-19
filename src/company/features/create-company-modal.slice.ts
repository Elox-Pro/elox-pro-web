import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { logout } from "../../auth/features/auth.slice";
import { CreateCompanyModalState } from "../states/create-company-modal.state";

const initialState: CreateCompanyModalState = {
    modal: {
        show: false
    }
}

const slice = createSlice({
    name: "createCompanyModal",
    initialState,
    reducers: {
        showCreateCompanyModal: (state, action: PayloadAction<boolean>) => {
            state.modal.show = action.payload;
        },
    }, extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return slice.getInitialState();
        });
    }
});

const createCompanyModalReducer = slice.reducer;

export const {
    showCreateCompanyModal,
} = slice.actions;

export default createCompanyModalReducer;