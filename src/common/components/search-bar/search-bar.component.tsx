import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/app.hooks';
import { setSearchBarClear, setSearchBarFocus, setSearchBarReset, setSearchBarText } from '../../features/search-bar.slice';
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
    const searchBar = useAppSelector((state) => state.searchBar);
    const searchText = searchBar.text;
    const focus = searchBar.focus;
    const reset = searchBar.reset;
    const inputRef = useRef<HTMLInputElement>(null);
    const [buttonFocus, setButtonFocus] = useState(false);
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
        dispatch(setSearchBarClear());
        dispatch(setSearchBarFocus(true));
        inputRef.current?.focus();
        if (onReset) {
            onReset();
        }
    };

    const buttonFocusOnFocus = () => {
        setButtonFocus(true);
    };

    const buttonFocusOnBlur = () => {
        setButtonFocus(false);
    };

    useEffect(() => {
        if (focus) {
            inputRef.current?.focus();
        }
    }, [focus]);

    return (
        <div className="search-bar">
            <Form>
                <div className={`input-group mb-3 ${focus || buttonFocus ? "active" : ""}`}>
                    <span className="input-group-text bg-transparent">
                        <i className="bi bi-search"></i>
                    </span>
                    <input
                        ref={inputRef}
                        autoFocus={focus}
                        className="form-control"
                        type="text"
                        placeholder={placeholder}
                        value={searchText}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    <button
                        type="button"
                        className="btn btn-reset"
                        onClick={handleReset}
                        onFocus={buttonFocusOnFocus}
                        onBlur={buttonFocusOnBlur}
                        disabled={!reset}
                    >
                        {reset && <i className="bi bi-x"></i>}
                    </button>
                </div>
            </Form>
        </div>
    );
}