import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../../features/common.slice";
import FlagIcon from "../flag-icon/flag-icon.component";
import Dropdown from "react-bootstrap/esm/Dropdown";

/**
 * An array of language objects containing the language code, name, and flag.
 * @type {Array<{ code: string, name: string, flag: string }>}
 */
const languages = [
    { code: "en", name: "English", flag: "us" },
    { code: "es", name: "Spanish", flag: "es" },
];

/**
 * A React component that renders a language switcher dropdown.
 * @returns {JSX.Element} The rendered component.
 */
export default function LanguageSwitcher() {
    const dispatch = useAppDispatch();
    const { i18n, t } = useTranslation();
    const language = useAppSelector((state) => state.common.language);

    useEffect(() => {
        // If the language code is null, set the initial language based on the i18n language
        if (language.code === null) {
            const initialLanguage = languages.find((lang) => lang.code === i18n.language);
            if (initialLanguage) {
                dispatch(setLanguage({ code: initialLanguage.code, flag: initialLanguage.flag }));
            } else {
                console.error(`Error: Invalid initial language code "${i18n.language}"`);
            }
        }
    }, []);

    /**
     * Handles the language change event and updates the language in the Redux store and the i18n instance.
     * @param {string|null} langCode - The language code to set. If null, the function returns without any action.
     */
    const handleLanguageChange = (langCode: string | null) => {
        if (langCode === null) {
            return;
        }

        const selectedLanguage = languages.find((lang) => lang.code === langCode);
        if (selectedLanguage) {
            // Change the language in the i18n instance
            i18n.changeLanguage(langCode);

            // Update the language in the Redux store with the new code and flag
            dispatch(setLanguage({ code: selectedLanguage.code, flag: selectedLanguage.flag }));
        } else {
            console.error(`Error: Invalid language code "${langCode}"`);
        }
    };

    return (
        <div>
            <Dropdown onSelect={handleLanguageChange}>
                <Dropdown.Toggle variant="light" id="language-dropdown" aria-label={t("languageSwitcher.label")}>
                    <FlagIcon country={language.flag} />
                </Dropdown.Toggle>
                <Dropdown.Menu aria-labelledby="language-dropdown">
                    {languages.map((lang, idx) => (
                        <Dropdown.Item key={idx} eventKey={lang.code} aria-label={`${lang.name} (${lang.code})`}>
                            <FlagIcon country={lang.flag} />&nbsp;
                            {lang.name}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}