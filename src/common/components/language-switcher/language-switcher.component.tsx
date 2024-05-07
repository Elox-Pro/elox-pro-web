import FlagIcon from "../flag-icon/flag-icon.component";
import Dropdown from "react-bootstrap/esm/Dropdown";
import "./language-switcher.style.scss"
import useAppLanguage from "../../hooks/app-language.hook";
import { useTranslation } from "react-i18next";

/**
 * A React component that renders a language switcher dropdown.
 * @returns {JSX.Element} The rendered component.
 */
export default function LanguageSwitcher() {
    const { t } = useTranslation("common", { keyPrefix: "language-switcher" });
    const { languages, language, handleChange } = useAppLanguage();

    return (
        <div>
            <Dropdown onSelect={handleChange}>
                <Dropdown.Toggle variant="dark" id="language-dropdown">
                    <FlagIcon country={language.flag} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {languages.map((lang, idx) => (
                        <Dropdown.Item key={idx} eventKey={lang.code || ""}>
                            <FlagIcon country={lang.flag} />&nbsp;
                            {lang.code && t(lang.code)}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}