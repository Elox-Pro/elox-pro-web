import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { Company } from "../types/company.type";
import { logout } from "../../auth/features/auth.slice";
import { User } from "../../users/types/user.type";
import { CompanyInfoPageState } from "../states/company-info-page.state";

const initialState: CompanyInfoPageState = {
    company: null,
    users: [],
    totalUsers: 0,
    customers: [],
    totalCustomers: 0
}

const slice = createSlice({
    name: "companyInfoPage",
    initialState,
    reducers: {
        setCompany: (state, action: PayloadAction<Company | null>) => {
            state.company = action.payload;
        },
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        setTotalUsers: (state, action: PayloadAction<number>) => {
            state.totalUsers = action.payload;
        },
        setCustomers: (state, action: PayloadAction<User[]>) => {
            state.customers = action.payload;
        },
        setTotalCustomers: (state, action: PayloadAction<number>) => {
            state.totalCustomers = action.payload;
        }
    }, extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return slice.getInitialState();
        });
    }
});

const companyInfoPageReducer = slice.reducer;
export const {
    setCompany,
    setUsers,
    setTotalUsers,
    setCustomers,
    setTotalCustomers,
} = slice.actions;
export default companyInfoPageReducer;