import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { logout } from "../../auth/features/auth.slice";
import { User } from "../../users/types/user.type";
import { Company } from "../types/company.type";
import { CompanyState } from "../states/company.state";

const initialState: CompanyState = {
    companies: [],
    company: null,
    companyUsers: [],
    totalCompanyUsers: 0,
    companyUser: null,
    users: [],
    totalUsers: 0,
    showEditCompanyNameModal: false,
    showCreateCompanyModal: false,
    showManageCompanyUserModal: false,
    showAddUserToCompanyModal: false,

}

const slice = createSlice({
    name: "companyState",
    initialState,
    reducers: {
        setCompanies: (state, action: PayloadAction<Company[]>) => {
            state.companies = action.payload;
        },
        setCompany: (state, action: PayloadAction<Company | null>) => {
            state.company = action.payload;
        },
        setCompanyUsers: (state, action: PayloadAction<User[]>) => {
            state.companyUsers = action.payload;
        },
        setTotalCompanyUsers: (state, action: PayloadAction<number>) => {
            state.totalCompanyUsers = action.payload;
        },
        setCompanyUser: (state, action: PayloadAction<User | null>) => {
            state.companyUser = action.payload;
        },
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        setTotalUsers: (state, action: PayloadAction<number>) => {
            state.totalUsers = action.payload;
        },
        setShowEditCompanyNameModal: (state, action: PayloadAction<boolean>) => {
            state.showEditCompanyNameModal = action.payload;
        },
        setShowCreateCompanyModal: (state, action: PayloadAction<boolean>) => {
            state.showCreateCompanyModal = action.payload;
        },
        setShowManageCompanyUserModal: (state, action: PayloadAction<boolean>) => {
            state.showManageCompanyUserModal = action.payload;
        },
        setShowAddUserToCompanyModal: (state, action: PayloadAction<boolean>) => {
            state.showAddUserToCompanyModal = action.payload;
        },
    }, extraReducers(builder) {
        builder.addCase(logout, () => {
            return slice.getInitialState();
        });
    },
});

const companyReducer = slice.reducer;

export const {
    setCompanies,
    setCompany,
    setCompanyUsers,
    setTotalCompanyUsers,
    setCompanyUser,
    setUsers,
    setTotalUsers,
    setShowEditCompanyNameModal,
    setShowCreateCompanyModal,
    setShowManageCompanyUserModal,
    setShowAddUserToCompanyModal,
} = slice.actions;

export default companyReducer;