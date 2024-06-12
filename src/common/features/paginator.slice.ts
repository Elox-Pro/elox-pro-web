import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { logout } from "../../auth/features/auth.slice";
import { PaginatorState } from "../types/pagination-state.type";

const initialState: PaginatorState = {
    currentPage: 1,
    results: 0,
    itemsPerPage: 20
}

const slice = createSlice({
    name: "paginator",
    initialState,
    reducers: {
        setPaginatorCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setPaginatorResults(state, action: PayloadAction<number>) {
            state.results = action.payload;
        },
        setPaginatorItemsPerPage(state, action: PayloadAction<number>) {
            state.itemsPerPage = action.payload;
        },
    }, extraReducers(builder) {
        builder.addCase(logout, () => {
            return slice.getInitialState();
        });
    },
});

const paginatorReducer = slice.reducer;

export const {
    setPaginatorCurrentPage,
    setPaginatorResults,
    setPaginatorItemsPerPage,
} = slice.actions;

export default paginatorReducer;