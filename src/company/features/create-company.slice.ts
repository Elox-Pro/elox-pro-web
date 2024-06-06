import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { logout } from "../../auth/features/auth.slice";
import { CompanyCreateState } from "../types/company-create-state.type";

const initialState: CompanyCreateState = {
    companyNameModal: false,
    companyNameValue: null,
    ownerUsernameModal: false,
    ownerUsernameValue: null,
    companySubmitFocus: false,
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
        setOwnerUsernameModal: (state, action: PayloadAction<boolean>) => {
            state.ownerUsernameModal = action.payload;
        },
        setOwnerUsernameValue: (state, action: PayloadAction<string>) => {
            state.ownerUsernameValue = action.payload;
        },
        setCompanySubmitFocus: (state, action: PayloadAction<boolean>) => {
            state.companySubmitFocus = action.payload;
        },
        resetCompanyCreateState: (state) => {
            state.companyNameModal = false;
            state.companyNameValue = null;
            state.ownerUsernameModal = false;
            state.ownerUsernameValue = null;
        },
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
    setOwnerUsernameModal,
    setOwnerUsernameValue,
    resetCompanyCreateState,
    setCompanySubmitFocus,
} = companyCreateSlice.actions;

export default companyCreateReducer;