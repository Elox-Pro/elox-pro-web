import { Theme } from "../../enums/theme.enum";

type ThemeIconProps = {
    theme: Theme;
}
export default function ThemeIcon({ theme }: ThemeIconProps) {
    const icon = theme === Theme.DARK ? "bi bi-moon-stars-fill" : "bi bi-brightness-high";
    return <i className={icon}></i>
}