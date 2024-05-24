import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getSearchTextFromUrl } from "../../common/helpers/get-param-from-url.helper";
import { CompanySearchBarState } from "../types/company-search-bar-state.type";
import { logout } from "../../auth/features/auth.slice";

const initialState: CompanySearchBarState = {
    searchText: getSearchTextFromUrl(),
    reset: getSearchTextFromUrl().trim().length > 0,
    focus: true
}

const companySearchBarSlice = createSlice({
    name: "companySearchBar",
    initialState,
    reducers: {
        setSearchBarText(state, action: PayloadAction<string>) {
            state.searchText = action.payload;
        },
        setSearchBarFocus(state, action: PayloadAction<boolean>) {
            state.focus = action.payload;
        },
        setSearchBarReset(state, action: PayloadAction<boolean>) {
            state.reset = action.payload;
        },
    },extraReducers(builder) {
        builder.addCase(logout, () => {
            return companySearchBarSlice.getInitialState();
        });
    },
});

const companySearchBarReducer = companySearchBarSlice.reducer;

export const {
    setSearchBarText,
    setSearchBarFocus,
    setSearchBarReset
} = companySearchBarSlice.actions;

export default companySearchBarReducer;