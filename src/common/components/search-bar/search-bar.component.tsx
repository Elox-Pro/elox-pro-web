import React, { useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import "./search-bar.styles.scss";
import { useNavigate } from 'react-router-dom';
import { PaginationState } from '../../types/pagination-state.type';
import { SearchBarState } from '../../types/search-bar-state.type';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../../app/hooks/app.hooks';

type SearchProps = {
    placeholder: string;
    searchBar: SearchBarState;
    pagination: PaginationState;
    setSearchText: ActionCreatorWithPayload<string>;
    setFocus: ActionCreatorWithPayload<boolean>;
    setReset: ActionCreatorWithPayload<boolean>;
    setCurrentPage: ActionCreatorWithPayload<number>;
};

/**
 * SearchBar component allows users to enter search text and handles search-related state.
 * @param {SearchProps} props - The properties for the SearchBar component.
 * @returns {JSX.Element} - The rendered SearchBar component.
 */
export default function SearchBar({
    searchBar, setSearchText, setReset, setFocus, pagination, placeholder, setCurrentPage
}: SearchProps): JSX.Element {
    const { t } = useTranslation("common", { keyPrefix: "search-bar" });
    const navigate = useNavigate();
    const searchText = searchBar.searchText;
    const focus = searchBar.focus;
    const reset = searchBar.reset;
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const resultCount = pagination.resultCount;

    /**
     * Handles changes in the search input field.
     * @param {React.ChangeEvent<HTMLInputElement>} event - The change event for the input field.
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        dispatch(setSearchText(value));
        dispatch(setReset(value.trim().length > 0));
        dispatch(setCurrentPage(1));
    };

    /**
     * Handles focus event on the search input field.
     */
    const handleFocus = () => {
        dispatch(setFocus(true));
    };

    /**
     * Handles blur event on the search input field.
     */
    const handleBlur = () => {
        dispatch(setFocus(false));
    };

    /**
     * Handles the reset action for the search input field.
     * @param {React.MouseEvent<HTMLButtonElement>} event - The click event for the reset button.
     */
    const handleReset = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(setSearchText(""));
        dispatch(setReset(false));
        dispatch(setFocus(true));
        dispatch(setCurrentPage(1));
        inputRef.current?.focus();
    };

    /**
     * Updates the URL with the current search text as a query parameter.
     */
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        if (!searchText || searchText.trim().length === 0) {
            queryParams.delete('search');
        } else {
            queryParams.set('search', searchText);
        }
        navigate(`${window.location.pathname}?${queryParams.toString()}`, { replace: true });
    }, [searchText, window.location.pathname, navigate]);

    /**
     * Focuses the input field whenever the pagination's current page changes.
     */
    useEffect(() => {
        if (focus) {
            inputRef.current?.focus();
        }
    }, [focus, pagination.currentPage]);

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
                    <small className="text-muted me-3">{resultCount} {t("result-found")}</small>
                </p>
            </div>
        </div>
    );
}
