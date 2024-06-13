import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { logout } from "../../auth/features/auth.slice";
import { ManageCompanyUserModalState } from "../types/manage-company-user-modal-state.type";
import { User } from "../../users/types/user.type";

const initialState: ManageCompanyUserModalState = {
    modal: {
        show: false
    },
    user: null,
    company: null,
}

const slice = createSlice({
    name: "manageCompanyUserModal",
    initialState,
    reducers: {
        showManageCompanyUserModal: (state, action: PayloadAction<boolean>) => {
            state.modal.show = action.payload;
        },
        setManageCompanyUserModalUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        setManageCompanyUserModalUserCompany: (state, action: PayloadAction<Company | null>) => {
            state.company = action.payload;
        }
    }, extraReducers(builder) {
        builder.addCase(logout, () => {
            return slice.getInitialState();
        });
    },
});

const manageCompanyUserModalReducer = slice.reducer;

export const {
    showManageCompanyUserModal,
    setManageCompanyUserModalUser,
    setManageCompanyUserModalUserCompany,
} = slice.actions;

export default manageCompanyUserModalReducer;