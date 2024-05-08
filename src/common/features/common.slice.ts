import { createSlice } from "@reduxjs/toolkit";
import { CommonState } from "../types/common-state.type";
import { Language } from "../types/language.type";
import { Theme } from "../enums/theme.enum";

const KEY: string = "eloxpro-app-theme";
function getInitalTheme(): Theme {

    const theme = window.localStorage.getItem(KEY) as Theme | null;
    if (theme !== null) {
        return theme;
    }
    return window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ? Theme.DARK : Theme.LIGHT;

}

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
    }],//TODO: Move to constants 
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
            window.localStorage.setItem(KEY, action.payload);
            document.documentElement.setAttribute("data-bs-theme", action.payload);
        }
    }
});

const commonReducer = commonSlice.reducer;
export const { setOverlay, setLanguage, setTheme } = commonSlice.actions;
export default commonReducer;