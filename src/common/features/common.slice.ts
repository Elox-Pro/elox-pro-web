import { createSlice } from "@reduxjs/toolkit";
import { CommonState } from "../types/common-state.type";
import { Language } from "../types/language.type";
import { Theme } from "../enums/theme.enum";
import { THEME_KEY, getInitalTheme } from "../helpers/get-initial-theme.helper";


const initialState: CommonState = {
    overlay: {
        active: false,
    },
    language: {
        code: null,
        flag: null
    },
    theme: {
        value: getInitalTheme()
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
        setTheme: (state, action: { payload: Theme }) => {
            state.theme.value = action.payload;
            window.localStorage.setItem(THEME_KEY, action.payload);
            document.documentElement.setAttribute("data-bs-theme", action.payload);
        }
    }
});

const commonReducer = commonSlice.reducer;
export const { setOverlay, setLanguage, setTheme } = commonSlice.actions;
export default commonReducer;