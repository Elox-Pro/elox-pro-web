import { Theme } from "../enums/theme.enum";

export const THEME_KEY: string = "eloxpro-app-theme";

export function getInitalTheme(): Theme {
    const theme = window.localStorage.getItem(THEME_KEY) as Theme | null;
    if (theme !== null) {
        return theme;
    }
    return window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ? Theme.DARK : Theme.LIGHT;

}
