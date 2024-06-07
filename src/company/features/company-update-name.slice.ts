import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { logout } from "../../auth/features/auth.slice";
import { CompanyUpdateNameState } from "../types/company-update-name-state.type";

const initialState: CompanyUpdateNameState = {
    modal: {
        show: false
    }
}

const slice = createSlice({
    name: "companyUpdateName",
    initialState,
    reducers: {
        setShowModal: (state, action: PayloadAction<boolean>) => {
            state.modal.show = action.payload;
        },
    }, extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return slice.getInitialState();
        });
    }
});

const companyUpdateNameReducer = slice.reducer;
export const {
    setShowModal,
} = slice.actions;
export default companyUpdateNameReducer;