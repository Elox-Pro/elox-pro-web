import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../../features/common.slice";
import FlagIcon from "../flag-icon/flag-icon.component";
import Dropdown from "react-bootstrap/esm/Dropdown";
import "./language-switcher.style.scss"


/**
 * A React component that renders a language switcher dropdown.
 * @returns {JSX.Element} The rendered component.
 */
export default function LanguageSwitcher() {
    const dispatch = useAppDispatch();
    const { i18n, t } = useTranslation("common", { keyPrefix: "language-switcher" });
    const language = useAppSelector((state) => state.common.language);

    /**
     * An array of language objects containing the language code, name, and flag.
     * @type {Array<{ code: string, name: string, flag: string }>}
     */
    const languages = [
        { code: "en", name: t("english"), flag: "us" },
        { code: "es", name: t("spanish"), flag: "es" },
    ];

    useEffect(() => {
        // If the language code is null, set the initial language based on the i18n language
        if (language.code === null) {
            const initialLanguage = languages.find((lang) => i18n.language.includes(lang.code));
            if (initialLanguage) {
                dispatch(setLanguage({ code: initialLanguage.code, flag: initialLanguage.flag }));
            } else {
                console.error(`Error: Invalid initial language code "${i18n.language}"`);
            }
        }
    }, []);

    /**
     * Handles the language change event and updates the language in the Redux store and the i18n instance.
     * @param {string|null} code - The language code to set. If null, the function returns without any action.
     */
    const handleLanguageChange = (code: string | null) => {
        if (code === null) {
            return;
        }

        const selectedLanguage = languages.find((lang) => lang.code === code);
        if (selectedLanguage) {
            // Change the language in the i18n instance
            i18n.changeLanguage(code);

            // Update the language in the Redux store with the new code and flag
            dispatch(setLanguage({ code: selectedLanguage.code, flag: selectedLanguage.flag }));
        } else {
            console.error(`Error: Invalid language code "${code}"`);
        }
    };

    return (
        <div>
            <Dropdown onSelect={handleLanguageChange}>
                <Dropdown.Toggle variant="dark" id="language-dropdown">
                    <FlagIcon country={language.flag} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {languages.map((lang, idx) => (
                        <Dropdown.Item key={idx} eventKey={lang.code}>
                            <FlagIcon country={lang.flag} />&nbsp;
                            {lang.name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}