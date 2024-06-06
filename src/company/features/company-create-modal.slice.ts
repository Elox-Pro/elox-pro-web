import { PayloadAction, createSlice } from "@reduxjs/toolkit/react";
import { logout } from "../../auth/features/auth.slice";
import { CompanyCreateModalState } from "../types/company-create-modal-state.type";

const initialState: CompanyCreateModalState = {
    show: false
}

const companyCreateModalSlice = createSlice({
    name: "companyCreateModal",
    initialState,
    reducers: {
        setShow: (state, action: PayloadAction<boolean>) => {
            state.show = action.payload;
        },
    }, extraReducers: (builder) => {
        builder.addCase(logout, () => {
            return companyCreateModalSlice.getInitialState();
        });
    }
});

const companyCreateModalReducer = companyCreateModalSlice.reducer;
export const companyCreateModalAction = companyCreateModalSlice.actions;
export default companyCreateModalReducer;