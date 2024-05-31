import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { logout } from "../../auth/features/auth.slice";
import { CompanyCreateState } from "../types/company-create-state.type";

const initialState: CompanyCreateState = {
    companyNameModal: false,
    companyNameValue: null,
}

const companyCreateSlice = createSlice({
    name: "companyCreate",
    initialState,
    reducers: {
        setCompanyNameModal: (state, action: PayloadAction<boolean>) => {
            state.companyNameModal = action.payload;
        },
        setCompanyNameValue: (state, action: PayloadAction<string>) => {
            state.companyNameValue = action.payload;
        },
        resetCompanyCreateState: (state) => {
            state.companyNameModal = false;
            state.companyNameValue = null;
        }
    }, extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return companyCreateSlice.getInitialState();
        });
    }
});

const companyCreateReducer = companyCreateSlice.reducer;

export const {
    setCompanyNameModal,
    setCompanyNameValue,
    resetCompanyCreateState,
} = companyCreateSlice.actions;

export default companyCreateReducer;