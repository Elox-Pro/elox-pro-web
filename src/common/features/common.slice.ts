import { createSlice } from "@reduxjs/toolkit";
import { CommonState } from "../types/common-state.type";
import { Language } from "../types/language.type";

const initialState: CommonState = {
    overlay: {
        active: false,
    },
    language: {
        code: null,
        flag: null,
    }
}

const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        setOverlay: (state, action: { payload: boolean }) => {
            state.overlay.active = action.payload;
        },
        setLanguage: (state, action: { payload: Language }) => {
            state.language = action.payload;
        },
    }
});

const commonReducer = commonSlice.reducer;
export const { setOverlay, setLanguage } = commonSlice.actions;
export default commonReducer;