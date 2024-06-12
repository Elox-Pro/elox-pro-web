import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CompanyPaginationState } from "../types/company-pagination-state.type";
import { getCurrentPageFromUrl } from "../../common/helpers/get-param-from-url.helper";
import { logout } from "../../auth/features/auth.slice";

const initialState: CompanyPaginationState = {
    currentPage: getCurrentPageFromUrl(),
    results: 0,
    itemsPerPage: 20
}

const companyPaginationSlice = createSlice({
    name: "companyPagination",
    initialState,
    reducers: {
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setResultCount(state, action: PayloadAction<number>) {
            state.results = action.payload;
        },
        setItemsPerPage(state, action: PayloadAction<number>) {
            state.itemsPerPage = action.payload;
        },
    }, extraReducers(builder) {
        builder.addCase(logout, () => {
            return companyPaginationSlice.getInitialState();
        });
    }
});

const companyPaginationReducer = companyPaginationSlice.reducer;
export const { setCurrentPage, setResultCount, setItemsPerPage } = companyPaginationSlice.actions;
export default companyPaginationReducer;