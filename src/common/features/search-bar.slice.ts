import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { logout } from "../../auth/features/auth.slice";
import { SearchBarState } from "../types/search-bar-state.type";

const initialState: SearchBarState = {
    text: "",
    reset: false,
    focus: true
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
        setSearchBarClear(state) {
            state.text = "";
            state.reset = false;
            state.focus = false;
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
    setSearchBarClear
} = slice.actions;
export default searchBarReducer;