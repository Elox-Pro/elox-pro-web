import { useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks/app.hooks";
import { setLanguage } from "../features/common.slice";

/**
 * Custom hook for managing the application's language settings.
 * Handles initialization of language and language change events.
 *
 * @returns {Object} - Object containing languages, current language, and handleChange function.
 */
export default function useAppLanguage() {
    const dispatch = useAppDispatch();
    const language = useAppSelector((state) => state.common.language);
    const languages = useAppSelector((state) => state.common.languages);
    const { i18n } = useTranslation();

    /**
     * Initializes the application language based on browser language if not already set.
     */
    const initLanguage = useCallback(() => {
        if (language.code === null) {
            const initLang = languages.find((lang) => lang.code && i18n.language.includes(lang.code));
            if (!initLang) {
                throw new Error(`Error: Invalid initial language code "${i18n.language}"`);
            }
            const { code, flag } = initLang;
            dispatch(setLanguage({ code, flag }));
        }
    }, [language, languages, dispatch, i18n.language]);

    useEffect(() => {
        initLanguage();
    }, [initLanguage]);

    /**
     * Handles the language change event.
     *
     * @param {string | null} code - The new language code to set.
     */
    const handleChange = (code: string | null) => {
        try {
            if (code === null) {
                throw new Error(`Invalid language code "${code}"`);
            }
            const selectedLang = languages.find((lang) => lang.code === code);
            if (!selectedLang) {
                throw new Error(`Invalid language code "${code}"`);
            }
            i18n.changeLanguage(code);
            const { flag } = selectedLang;
            dispatch(setLanguage({ code, flag }));
        } catch (error) {
            console.error(error);
        }
    };

    return { languages, language, handleChange };
}
