import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { logout } from "../../auth/features/auth.slice";
import { CompanyProgressBarSubmitState } from "../types/company-progress-bar-submit.type";

const initialState: CompanyProgressBarSubmitState = {
    now: 0,
    full: 0,
    total: 0
}

const companyProgressBarSubmitSlice = createSlice({
    name: "companyProgressBarSubmit",
    initialState,
    reducers: {
        setCompanyProgressBarSubmitNow(state, action: PayloadAction<number>) {
            state.now = action.payload;
        },
        setCompanyProgressBarSubmitFull(state, action: PayloadAction<number>) {
            state.full = action.payload;
        },
        setCompanyProgressBarSubmitValue(state, action: PayloadAction<number>) {
            state.total = action.payload;
        },
        addCompanyProgressBarSubmitNow(state) {
            state.now += state.total;
        }
    }, extraReducers(builder) {
        builder.addCase(logout, () => {
            return companyProgressBarSubmitSlice.getInitialState();
        });
    }
});

const companyProgressBarSubmitReducer = companyProgressBarSubmitSlice.reducer;
export const {
    setCompanyProgressBarSubmitNow,
    setCompanyProgressBarSubmitFull,
    setCompanyProgressBarSubmitValue,
    addCompanyProgressBarSubmitNow
} = companyProgressBarSubmitSlice.actions;
export default companyProgressBarSubmitReducer;