import FlagIcon from "../flag-icon/flag-icon.component";
import Dropdown from "react-bootstrap/esm/Dropdown";
import "./language-switcher.style.scss"
import useAppLanguage from "../../hooks/app-language.hook";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../app/hooks/app.hooks";
import { setOverlay } from "../../features/common.slice";
import { toast } from "react-toastify";

/**
 * A React component that renders a language switcher dropdown.
 * @returns {JSX.Element} The rendered component.
 */
export default function LanguageSwitcher() {
    const { t } = useTranslation("common", { keyPrefix: "language-switcher" });
    const dispatch = useAppDispatch();
    const { languages, language, handleChange } = useAppLanguage();

    const handleSelect = (code: string | null) => {
        dispatch(setOverlay(true));
        handleChange(code);
        dispatch(setOverlay(false));
        toast.success(t("success"));
    }

    return (
        <div className="mt-2">
            <Dropdown onSelect={handleSelect}>
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