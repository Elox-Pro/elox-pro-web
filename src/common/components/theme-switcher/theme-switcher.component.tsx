import Dropdown from "react-bootstrap/esm/Dropdown";
import { useTranslation } from "react-i18next";
import { getThemeList } from "../../helpers/get-theme-list.helper";
import "./theme-switcher.style.scss";
import ThemeIcon from "../theme-icon/theme-icon.component";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { Theme } from "../../enums/theme.enum";
import { setTheme } from "../../features/common.slice";

/**
 * A React component that renders a theme switcher dropdown.
 * @returns {JSX.Element} The rendered component.
 */
export default function ThemeSwitcher() {
    const { t } = useTranslation("common", { keyPrefix: "theme-switcher" });
    const dispatch = useAppDispatch();
    const theme = useAppSelector(state => state.common.theme);
    const themes = getThemeList();
    const handleChange = (value: string | null) => {
        const theme = value as Theme | null;
        if (theme !== null) {
            dispatch(setTheme(theme))
        }
    }

    return (
        <div className="mt-2">
            <Dropdown onSelect={handleChange}>
                <Dropdown.Toggle variant="dark" id="theme-dropdown">
                    <ThemeIcon theme={theme.value} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {themes.map((theme, idx) => (
                        <Dropdown.Item key={idx} eventKey={theme}>
                            <ThemeIcon theme={theme} />&nbsp;
                            {t(theme)}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}