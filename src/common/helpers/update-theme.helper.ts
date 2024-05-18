import { Theme } from "../enums/theme.enum";
import { THEME_KEY } from "./get-initial-theme.helper";

export function updateTheme(theme: Theme) {
    window.localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute("data-bs-theme", theme);
}