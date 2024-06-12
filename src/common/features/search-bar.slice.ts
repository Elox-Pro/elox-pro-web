import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { logout } from "../../auth/features/auth.slice";
import { SearchBarState } from "../types/search-bar-state.type";

const initialState: SearchBarState = {
    text: "",
    reset: false,
    focus: true,
    results: 0
}

const slice = createSlice({
    name: "searchBar",
    initialState,
    reducers: {
        setSearchBarText(state, action: PayloadAction<string>) {
            state.text = action.payload;
        },
        setSearchBarFocus(state, action: PayloadAction<boolean>) {
            state.focus = action.payload;
        },
        setSearchBarReset(state, action: PayloadAction<boolean>) {
            state.reset = action.payload;
        },
        setSearchBarResults(state, action: PayloadAction<number>) {
            state.results = action.payload;
        }
    }, extraReducers(builder) {
        builder.addCase(logout, () => {
            return slice.getInitialState();
        });
    },
});

const searchBarReducer = slice.reducer;
export const {
    setSearchBarText,
    setSearchBarFocus,
    setSearchBarReset,
    setSearchBarResults
} = slice.actions;
export default searchBarReducer;