import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { CompanyState } from "../types/company-state.type";
import { Company } from "../types/company.type";
import { logout } from "../../auth/features/auth.slice";

const initialState: CompanyState = {
    list: [],
    selected: null
}

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        setCompanyList: (state, action: PayloadAction<Company[]>) => {
            state.list = action.payload;
        },
        setSelectedCompany: (state, action: PayloadAction<Company | null>) => {
            state.selected = action.payload;
        },
    }, extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return companySlice.getInitialState();
        });
    }
});

const companyReducer = companySlice.reducer;

export const {
    setCompanyList,
    setSelectedCompany,
} = companySlice.actions;

export default companyReducer;