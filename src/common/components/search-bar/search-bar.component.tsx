import React, { useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/app.hooks';
import { setSearchBarFocus, setSearchBarReset, setSearchBarText } from '../../features/search-bar.slice';
import "./search-bar.styles.scss";

type SearchBarProps = {
    placeholder: string;
    onChange?: () => void;
    onReset?: () => void;
}

/**
 * SearchBar component allows users to enter search text and handles search-related state.
 * @param {SearchBarProps} props - The properties for the SearchBar component.
 * @returns {JSX.Element} - The rendered SearchBar component.
 */
export default function SearchBar({ placeholder, onChange, onReset }: SearchBarProps): JSX.Element {
    const { t } = useTranslation("common", { keyPrefix: "search-bar" });
    const searchBar = useAppSelector((state) => state.searchBar);
    const searchText = searchBar.text;
    const focus = searchBar.focus;
    const reset = searchBar.reset;
    const results = searchBar.results;
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();

    /**
     * Handles changes in the search input field.
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event for the input field.
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        dispatch(setSearchBarText(value));
        dispatch(setSearchBarReset(value.trim().length > 0));
        if (onChange) {
            onChange();
        }
        // dispatch(setCurrentPage(1));
    };

    /**
     * Handles focus event on the search input field.
     */
    const handleFocus = () => {
        dispatch(setSearchBarFocus(true));
    };

    /**
     * Handles blur event on the search input field.
     */
    const handleBlur = () => {
        dispatch(setSearchBarFocus(false));
    };

    /**
     * Handles the reset action for the search input field.
     * @param {React.MouseEvent<HTMLButtonElement>} event - The click event for the reset button.
     */
    const handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(setSearchBarText(""));
        dispatch(setSearchBarReset(false));
        dispatch(setSearchBarFocus(true));
        inputRef.current?.focus();
        if (onReset) {
            onReset();
        }
        // dispatch(setCurrentPage(1));
    };

    useEffect(() => {
        if (focus) {
            inputRef.current?.focus();
        }
    }, [focus]);

    return (
        <div className="search-bar">
            <Form>
                <div className={`input-group mb-3 ${focus ? "active" : ""}`}>
                    <span className="input-group-text bg-transparent">
                        <i className="bi bi-search"></i>
                    </span>
                    <input
                        ref={inputRef}
                        autoFocus={focus}
                        className="form-control p-3"
                        type="text"
                        placeholder={placeholder}
                        value={searchText}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleReset}
                        disabled={!reset}
                    >
                        <i className="bi bi-x-circle"></i>
                    </button>
                </div>
            </Form>
            <div className="d-flex flex-column">
                <p className="text-end">
                    <small className="text-muted me-3">{results} {t("result-found")}</small>
                </p>
            </div>
        </div>
    );
}