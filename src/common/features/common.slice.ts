import { createSlice } from "@reduxjs/toolkit";
import { CommonState } from "../types/common-state.type";
import { Language } from "../types/language.type";

const initialState: CommonState = {
    overlay: {
        active: false,
    },
    language: {
        code: null,
        flag: null
    },
    languages: [{
        code: "en",
        flag: "us"
    }, {
        code: "es",
        flag: "es"
    }]
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
        setLanguages: (state, action: { payload: Language[] }) => {
            state.languages = action.payload;
        },
    }
});

const commonReducer = commonSlice.reducer;
export const { setOverlay, setLanguage, setLanguages } = commonSlice.actions;
export default commonReducer;