import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { CompanyListState } from "../states/company-list.state";
import { Company } from "../types/company.type";
import { logout } from "../../auth/features/auth.slice";

const initialState: CompanyListState = {
    items: [],
    selected: null
}

const slice = createSlice({
    name: "companyList",
    initialState,
    reducers: {
        setCompanyListItems: (state, action: PayloadAction<Company[]>) => {
            state.items = action.payload;
        },
        setCompanyListSelected: (state, action: PayloadAction<Company | null>) => {
            state.selected = action.payload;
        }
    }, extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return slice.getInitialState();
        });
    }
});

const companyListReducer = slice.reducer;

export const {
    setCompanyListItems,
    setCompanyListSelected
} = slice.actions;

export default companyListReducer;